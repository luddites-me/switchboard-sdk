/* eslint-disable */
import { TransactionStatus } from '..';

/**
 * Safely converts a string to a TransactionStatus
 * @param transactionStatus - a transaction status to attempt to parse
 * @returns TransactionStatus; defaults to 'PENDING' if not parsable
 * @public
 */
export const stringToTransactionStatus = (transactionStatus = ''): TransactionStatus => {
  switch (transactionStatus.toLowerCase().trim()) {
    case 'processing':
    case 'pending':
      return TransactionStatus.PENDING;
    case 'error':
      return TransactionStatus.ERROR;
    case 'successful':
    case 'success':
    case 'succeeded':
      return TransactionStatus.SUCCESS;
    case 'failed':
    case 'failure':
    case 'fail':
      return TransactionStatus.FAILURE;
    default:
      return TransactionStatus.PENDING;
  }
};
