import { CreditCardTransactionType } from 'ns8-protect-models';

/**
 * Safely converts a string to a CreditCardTransactionType
 * @param creditCardTransactionType - a credit card transaction type to attempt to parse
 * @returns CreditCardTransactionType; defaults to 'AUTHORIZATION' if not parsable
 */
export const stringToCreditCardTransactionType = (creditCardTransactionType = ''): CreditCardTransactionType => {
  switch (creditCardTransactionType.toLowerCase().trim()) {
    case 'authorization':
      return CreditCardTransactionType.AUTHORIZATION;
    case 'capture':
      return CreditCardTransactionType.CAPTURE;
    case 'refund':
      return CreditCardTransactionType.REFUND;
    case 'order':
    case 'sale':
      return CreditCardTransactionType.SALE;
    case 'void':
      return CreditCardTransactionType.VOID;
    default:
      return CreditCardTransactionType.AUTHORIZATION;
  }
};
