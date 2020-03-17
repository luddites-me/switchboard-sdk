import { Transaction } from 'ns8-protect-models';
import { stringToTransactionMethod } from './transactionMethod';
import { toDate } from '../util/date';
import { stringToTransactionStatus } from './transactionStatus';
import { CreditCardData, toCreditCard } from './toCreditCard';

export interface TransactionData {
  amount?: string | number;
  creditCard?: CreditCardData;
  currency?: string;
  method?: string;
  platformId?: string | number;
  processedAt?: string | Date;
  status?: string;
  statusDetails?: string;
}

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
