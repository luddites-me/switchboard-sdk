// eslint-disable
import { CreditCardTransactionType } from 'ns8-protect-models';

/**
 * Safely converts a string to a CreditCardTransactionType
 * @param creditCardTransactionType - a credit card transaction type to attempt to parse
 * @returns CreditCardTransactionType; defaults to 'AUTHORIZATION' if not parsable
 * @public
 */
export const stringToCreditCardTransactionType = (creditCardTransactionType = ''): CreditCardTransactionType => {
  switch (creditCardTransactionType.toLowerCase().trim()) {
    case 'authorize':
    case 'authorized':
    case 'authorization':
      return CreditCardTransactionType.AUTHORIZATION;
    case 'capture':
    case 'captured':
      return CreditCardTransactionType.CAPTURE;
    case 'refund':
    case 'refunded':
      return CreditCardTransactionType.REFUND;
    case 'order':
    case 'ordered':
    case 'sale':
      return CreditCardTransactionType.SALE;
    case 'void':
    case 'voided':
      return CreditCardTransactionType.VOID;
    default:
      return CreditCardTransactionType.AUTHORIZATION;
  }
};
