import { Transaction } from '..';
import { stringToTransactionMethod } from './transactionMethod';
import { toDate } from '../util/date';
import { stringToTransactionStatus } from './transactionStatus';
import { CreditCardData, toCreditCard } from './toCreditCard';

/**
 * Generic object representing a Transaction.
 * @remarks
 * All properties are optional unless otherwise documented.
 * Not all transactions will have all of this data.
 * @public
 */
export interface TransactionData {
  /**
   * Required.
   */
  amount: string | number;
  creditCard?: CreditCardData;
  /**
   * Required. Should be the type of currency,
   * such as USD, EUR, JPY, GBP, etc.
   * Max Length: 3
   */
  currency: string;
  /**
   * This should be translatable to a TransactionMethod:
   *  CC, COD, Check, Bank Wire, Other (case-insensitive)
   * Converter will attempt to loosely parse the passed string,
   *  if an exact match cannot be found.
   */
  method?: string;
  /**
   * Max length: 100
   */
  platformId?: string | number;
  /**
   * Default to now
   */
  processedAt?: string | Date;
  /**
   * This should be translatable to a TransactionStatus
   */
  status?: string;
  /**
   * Max length: 65535
   */
  statusDetails?: string;
}

/**
 * Converts a generic object representing a transaction into a Protect model
 * @param data - generic transaction data
 * @public
 */
export const toTransaction = (data: TransactionData): Transaction => {
  const { amount, creditCard, currency, method, platformId, processedAt, status, statusDetails } = data;
  const transaction = new Transaction({ currency: currency.substr(0, 3) });
  transaction.amount = +amount;
  if (creditCard) {
    transaction.creditCard = toCreditCard(creditCard);
  }
  transaction.method = stringToTransactionMethod(method);
  if (platformId) {
    transaction.platformId = `${platformId}`.substr(0, 100);
  }
  const processedAtDate = toDate(processedAt);
  if (processedAtDate) {
    transaction.processedAt = processedAtDate;
  } else {
    transaction.processedAt = new Date();
  }
  transaction.status = stringToTransactionStatus(status);
  if (statusDetails) {
    transaction.statusDetails = statusDetails.substr(0, 65535);
  }
  return transaction;
};
