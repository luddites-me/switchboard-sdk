/* eslint-disable */
import { TransactionMethod } from '..';

/**
 * Safely converts a string to a TransactionMethod
 * @param transactionMethod - a transaction method to attempt to parse
 * @returns TransactionMethod; defaults to 'OTHER' if not parsable
 * @public
 */
export const stringToTransactionMethod = (transactionMethod = ''): TransactionMethod => {
  const method = transactionMethod.toLowerCase().trim().replace(' ', '').replace('_', '');
  switch (method) {
    case 'bankwire':
      return TransactionMethod.BANK_WIRE;
    case 'cc':
    case 'creditcard':
      return TransactionMethod.CC;
    case 'checkmo':
    case 'check':
      return TransactionMethod.CHECK;
    case 'cod':
    case 'cashondelivery':
    case 'moneyorder':
      return TransactionMethod.COD;
    default:
      return TransactionMethod.OTHER;
  }
};
