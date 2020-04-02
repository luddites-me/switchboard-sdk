import { CreditCard } from 'ns8-protect-models';
import { stringToCreditCardTransactionType } from './creditCardTransactionType';

/**
 * Generic object representing a credit card.
 * All properties are optional unless otherwise documented.
 * Not all payment providers will have all of this data.
 */
export interface CreditCardData {
  avsResultCode?: string | number;
  cardExpiration?: string;
  cardHolder?: string;
  creditCardBin?: string | number;
  creditCardCompany?: string;
  /**
   * The full number is not expected or required.
   * This is frequently just the last 4 digits.
   */
  creditCardNumber?: string | number;
  cvvResultCode?: string | number;
  gateway?: string;
  /**
   * Should be convertable to a CreditCardTransactionType:
   *  Authorization, Sale, Capture, Refund, Void (case-insensitive)
   * Converter will attempt to loosely parse the passed string,
   * if an exact match cannot be found.
   * @default 'Sale'
   */
  transactionType?: string;
}

/**
 * Converts a generic object representing a credit card into a Protect model
 * @param data - an object to convert
 */
export const toCreditCard = (data: CreditCardData): CreditCard => {
  const {
    avsResultCode,
    cardExpiration,
    cardHolder,
    creditCardBin,
    creditCardCompany,
    creditCardNumber,
    cvvResultCode,
    gateway,
    transactionType,
  } = data;
  const creditCard = new CreditCard();
  if (avsResultCode) {
    creditCard.avsResultCode = `${avsResultCode}`;
  }
  if (cardExpiration) {
    creditCard.cardExpiration = cardExpiration;
  }
  if (cardHolder) {
    creditCard.cardHolder = cardHolder;
  }
  if (creditCardBin) {
    creditCard.creditCardBin = `${creditCardBin}`;
  }
  if (creditCardCompany) {
    creditCard.creditCardCompany = creditCardCompany;
  }
  if (creditCardNumber) {
    creditCard.creditCardNumber = `${creditCardNumber}`;
  }
  if (cvvResultCode) {
    creditCard.cvvResultCode = `${cvvResultCode}`;
  }
  if (gateway) {
    creditCard.gateway = gateway;
  }
  creditCard.transactionType = stringToCreditCardTransactionType(transactionType);
  return creditCard;
};
