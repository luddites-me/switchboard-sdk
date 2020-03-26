import { sign } from 'aws4';
import { SQS, STS } from 'aws-sdk';
import { Handler as LambdaHandler } from 'aws-lambda';
import { CreateQueueResult } from 'aws-sdk/clients/sqs';

const POLLING_SESSION_TIMEOUT_SECONDS = 15 * 60;

interface DeletePolledMessageEvent {
  merchantId: string;
  merchantIntegrationPlatformType: string;
  receiptHandle: string;
}

interface GetPollUrlResult {
  url: string;
}

interface PollQueueEvent {
  merchantId: string;
  merchantIntegrationPlatformType: string;
}

const getQueueName = (pollQueueEvent: PollQueueEvent, forDeadLetter = false): string => {
  const dlqSuffix = forDeadLetter ? '-dlq' : '';
  return [
    process.env.STAGE,
    pollQueueEvent.merchantIntegrationPlatformType,
    `${pollQueueEvent.merchantId}${dlqSuffix}`,
  ].join('-');
};

export const CreatePollingQueue: LambdaHandler<PollQueueEvent, void> = async (event: PollQueueEvent): Promise<void> => {
  const sqsClient = new SQS();
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

  await sqsClient
    .createQueue({
      QueueName: getQueueName(event),
      Attributes: {
        RedrivePolicy: JSON.stringify({
          deadLetterTargetArn: deadLetterQueueAttributes.Attributes.QueueArn,
          maxReceiveCount: 5,
        }),
      },
    })
    .promise();
};

export const DeletePolledMessage: LambdaHandler<DeletePolledMessageEvent, void> = async (
  event: DeletePolledMessageEvent,
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

export const GetPollUrl: LambdaHandler<PollQueueEvent, GetPollUrlResult> = async (
  event: PollQueueEvent,
): Promise<GetPollUrlResult> => {
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
