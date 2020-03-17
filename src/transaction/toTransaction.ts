import { Transaction } from 'ns8-protect-models';
import { stringToTransactionMethod } from './transactionMethod';
import { toDate } from '../util/date';
import { stringToTransactionStatus } from './transactionStatus';
import { CreditCardData, toCreditCard } from './toCreditCard';

/**
 * Generic object that can be mapped to a Protect Transaction
 */
export interface TransactionData {
  amount?: string | number;
  creditCard?: CreditCardData;
  currency?: string;
  /**
   * This should be translatable to a TransactionMethod
   */
  method?: string;
  platformId?: string | number;
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
  const transaction = new Transaction();
  if (amount) {
    transaction.amount = +amount;
  }
  if (creditCard) {
    transaction.creditCard = toCreditCard(creditCard);
  }
  if (currency) {
    transaction.currency = currency;
  }
  transaction.method = stringToTransactionMethod(method);
  if (platformId) {
    transaction.platformId = `${platformId}`;
  }
  const processedAtDate = toDate(processedAt);
  if (processedAtDate) {
    transaction.processedAt = processedAtDate;
  }
  transaction.status = stringToTransactionStatus(status);
  if (statusDetails) {
    transaction.statusDetails = statusDetails;
  }
  return transaction;
};
