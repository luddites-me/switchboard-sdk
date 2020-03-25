import { Transaction } from 'ns8-protect-models';
import { stringToTransactionMethod } from './transactionMethod';
import { toDate } from '../util/date';
import { stringToTransactionStatus } from './transactionStatus';
import { CreditCardData, toCreditCard } from './toCreditCard';

/**
 * Generic object representing a Transaction.
 * All properties are optional unless otherwise documented.
 * Not all transactions will have all of this data.
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
   */
  currency: string;
  /**
   * This should be translatable to a TransactionMethod:
   *  CC, COD, Check, Bank Wire, Other (case-insensitive)
   * Converter will attempt to loosely parse the passed string,
   *  if an exact match cannot be found.
   * @default 'Other'
   */
  method?: string;
  platformId?: string | number;
  /**
   * @default now
   */
  processedAt?: string | Date;
  /**
   * This should be translatable to a TransactionStatus
   */
  status?: string;
  statusDetails?: string;
}

/**
 * Converts a generic object representing a transaction into a Protect model
 * @param data - generic transaction data
 */
export const toTransaction = (data: TransactionData): Transaction => {
  const { amount, creditCard, currency, method, platformId, processedAt, status, statusDetails } = data;
  const transaction = new Transaction({ currency });
  transaction.amount = +amount;
  if (creditCard) {
    transaction.creditCard = toCreditCard(creditCard);
  }
  transaction.method = stringToTransactionMethod(method);
  if (platformId) {
    transaction.platformId = `${platformId}`;
  }
  const processedAtDate = toDate(processedAt);
  if (processedAtDate) {
    transaction.processedAt = processedAtDate;
  } else {
    transaction.processedAt = new Date();
  }
  transaction.status = stringToTransactionStatus(status);
  if (statusDetails) {
    transaction.statusDetails = statusDetails;
  }
  return transaction;
};
