import { sign } from 'aws4';
import { SQS, STS } from 'aws-sdk';
import { Handler as LambdaHandler } from 'aws-lambda';
import { CreateQueueRequest, CreateQueueResult } from 'aws-sdk/clients/sqs';
import {
  CreatePolledMessageLambdaPayload,
  DeletePolledMessageLambdaPayload,
  PollQueueLambdaPayload,
} from 'ns8-switchboard-interfaces';

/**
 * This is how long a URL returned from GetPollUrl will work before returning
 * 401s.  Logic on the integration side uses this value (15 minutes); if we
 * change it here we have to change it on the integration side too (i.e. in the
 * code that's calling the polling URL)
 */
const POLLING_SESSION_TIMEOUT_SECONDS = 15 * 60;

/**
 * The number of queues that we expect to match a merchant-specific-queue
 * name prefix (1 for the queue itself, and one for the dead letter queue).
 */
const EXPECTED_LISTQUEUES_LENGTH = 2;

/**
 * The number of times a message can be received, but not deleted, before
 * it's moved to the dead letter queue
 */
const MAX_RECEIVE_COUNT = 5;

/**
 * Queue attributes: https://docs.aws.amazon.com/cli/latest/reference/sqs/create-queue.html
 */
const VISIBILITY_TIMEOUT = 60;
const RECEIVE_MESSAGE_WAIT_TIME = 3;

interface GetPollUrlResultPayload {
  url: string;
}

const getQueueName = (pollQueueEvent: PollQueueLambdaPayload, forDeadLetter = false): string => {
  const dlqSuffix = forDeadLetter ? '-dlq' : '';
  return [process.env.STAGE, `${pollQueueEvent.merchantId}${dlqSuffix}`].join('-');
};

/**
 * Check if a merchant's SQS queue already exists, and create it if not.
 *
 * We check if the queue exists by calling `listQueues` with a prefix set to the expected
 * queue name.  We expect 2 (EXPECTED_LISTQUEUES_LENGH) queues to be found: one for the
 * actual queue and one that's created as a "dead letter queue", where problematic events
 * are moved to if they're received but not deleted `MAX_RECEIVE_COUNT` times:
 * https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html
 *
 * @param event - attributes used to identify the merchant-specific queue
 */
const createPollingQueueIfNotExist = async (event: PollQueueLambdaPayload): Promise<void> => {
  const sqsClient = new SQS();

  const { QueueUrls } = await sqsClient.listQueues({ QueueNamePrefix: getQueueName(event) }).promise();
  if (QueueUrls?.length === EXPECTED_LISTQUEUES_LENGTH) {
    return;
  }

  const deadLetterQueue: CreateQueueResult = await sqsClient
    .createQueue({
      QueueName: getQueueName(event, true),
    })
    .promise();

  if (deadLetterQueue.QueueUrl == null) {
    throw new Error('Unable to create DLQ');
  }

  const deadLetterQueueAttributes = await sqsClient
    .getQueueAttributes({
      QueueUrl: deadLetterQueue.QueueUrl,
      AttributeNames: ['QueueArn'],
    })
    .promise();

  if (deadLetterQueueAttributes.Attributes == null) {
    throw new Error('Unable to get DLQ attributes');
  }

  const createQueueRequest: CreateQueueRequest = {
    QueueName: getQueueName(event),
    Attributes: {
      RedrivePolicy: JSON.stringify({
        deadLetterTargetArn: deadLetterQueueAttributes.Attributes.QueueArn,
        maxReceiveCount: MAX_RECEIVE_COUNT,
      }),
      VisibilityTimeout: `${VISIBILITY_TIMEOUT}`,
      ReceiveMessageWaitTimeSeconds: `${RECEIVE_MESSAGE_WAIT_TIME}`,
    },
  };
  await sqsClient.createQueue(createQueueRequest).promise();
};

/**
 * Send a message from the merchant-platform to the queue.
 *
 * @param event - attributes used to identify the merchant-specific queue and the
 * message to be deleted
 */
export const createPolledMessage: LambdaHandler<CreatePolledMessageLambdaPayload, void> = async (
  event: CreatePolledMessageLambdaPayload,
): Promise<void> => {
  const sqsClient = new SQS();
  const { QueueUrl } = await sqsClient.getQueueUrl({ QueueName: getQueueName(event) }).promise();
  if (QueueUrl == null) {
    throw new Error(`Unable to get QueueUrl for ${JSON.stringify(event)}`);
  }
  const req: SQS.SendMessageRequest = {
    QueueUrl,
    MessageBody: JSON.stringify(event.message),
  };
  await sqsClient.sendMessage(req).promise();
};

/**
 * Delete a message that has been processed by the merchant-platform.
 *
 * @param event - attributes used to identify the merchant-specific queue and the
 * message to be deleted
 */
export const deletePolledMessage: LambdaHandler<DeletePolledMessageLambdaPayload, void> = async (
  event: DeletePolledMessageLambdaPayload,
): Promise<void> => {
  const sqsClient = new SQS();
  const { QueueUrl } = await sqsClient.getQueueUrl({ QueueName: getQueueName(event) }).promise();
  if (QueueUrl == null) {
    throw new Error(`Unable to get QueueUrl for ${JSON.stringify(event)}`);
  }
  const req: SQS.DeleteMessageRequest = {
    QueueUrl,
    ReceiptHandle: event.receiptHandle,
  };
  await sqsClient.deleteMessage(req).promise();
};

/**
 * Get a URL that can be used to poll/receive new messages from the queue.
 *
 * @param event - attributes used to identify the merchant-specific queue
 */
export const getPollUrl: LambdaHandler<PollQueueLambdaPayload, GetPollUrlResultPayload> = async (
  event: PollQueueLambdaPayload,
): Promise<GetPollUrlResultPayload> => {
  await createPollingQueueIfNotExist(event);

  const sts = new STS();
  const { Arn } = await sts.getCallerIdentity().promise();
  if (Arn == null) {
    throw new Error('Unable to get caller identity');
  }
  const match = /arn:aws:sts::(\d+):assumed-role\/([^/]+)/.exec(Arn);
  if (match == null) {
    throw new Error(`Unable to parse Arn '${Arn}'`);
  }
  const queueName = getQueueName(event);
  const [accountId, roleName] = match.slice(1, 3);
  const { Credentials } = await sts
    .assumeRole({
      DurationSeconds: POLLING_SESSION_TIMEOUT_SECONDS,
      RoleArn: `arn:aws:iam::${accountId}:role/${roleName}`,
      RoleSessionName: `${queueName}-access`,
    })
    .promise();
  if (Credentials == null) {
    throw new Error(`Unable to assume role '${Arn}'`);
  }

  const path = `/${accountId}/${queueName}?Action=ReceiveMessage&Version=2012-11-05`;
  const signed = sign(
    {
      service: 'sqs',
      region: process.env.AWS_REGION,
      path,
      signQuery: true,
    },
    {
      secretAccessKey: Credentials.SecretAccessKey,
      accessKeyId: Credentials.AccessKeyId,
      sessionToken: Credentials.SessionToken,
    },
  );

  return {
    url: `https://${signed.headers.Host}${signed.path}`,
  };
};
