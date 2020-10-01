import { OrderMessage } from './messages';

/**
 * Base interface for the polling lambdas
 */
export interface PollQueueLambdaPayload {
  /**
   * Should be the merchant.id from Protect
   */
  merchantId: string;
}

/**
 * Message format for delete from queue
 */
export interface DeletePolledMessageLambdaPayload extends PollQueueLambdaPayload {
  /**
   * Message handle id to delete
   */
  receiptHandle: string;
}

/**
 * Message format for add to queue
 */
export interface CreatePolledMessageLambdaPayload extends PollQueueLambdaPayload {
  /**
   * Content to add into a queue
   */
  message: OrderMessage;
}

/**
 * Polling methods available
 */
export enum PollingFunctionName {
  CREATE_POLLED_MESSAGE = 'createPolledMessage',
  CREATE_QUEUE = 'createPollingQueue',
  DELETE_POLLED_MESSAGE = 'deletePolledMessage',
  GET_POLL_URL = 'getPollUrl',
}
