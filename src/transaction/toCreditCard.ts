// eslint-disable
import { CreditCard } from 'ns8-protect-models';
import { stringToCreditCardTransactionType } from './creditCardTransactionType';

/**
 * Generic object representing a credit card.
 * @remarks
 * All properties are optional unless otherwise documented.
 * Not all payment providers will have all of this data.
 * @public
 */
export interface CreditCardData {
  /**
   * Max length: 36
   */
  avsResultCode?: string | number;
  /**
   * Max length: 10
   */
  cardExpiration?: string;
  /**
   * Max length: 100
   */
  cardHolder?: string;
  /**
   * Max length: 10
   */
  creditCardBin?: string | number;
  /**
   * Max length: 100
   */
  creditCardCompany?: string;
  /**
   * The full number is not expected or required.
   * This is frequently just the last 4 digits.
   */
  creditCardNumber?: string | number;
  /**
   * Max length: 36
   */
  cvvResultCode?: string | number;
  /**
   * Max length: 100
   */
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
 * @public
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
    creditCard.avsResultCode = `${avsResultCode}`.substr(0, 36);
  }
  if (cardExpiration) {
    creditCard.cardExpiration = cardExpiration.substr(0, 10);
  }
  if (cardHolder) {
    creditCard.cardHolder = cardHolder.substr(0, 100);
  }
  if (creditCardBin) {
    creditCard.creditCardBin = `${creditCardBin}`.substr(0, 10);
  }
  if (creditCardCompany) {
    creditCard.creditCardCompany = creditCardCompany.substr(0, 100);
  }
  if (creditCardNumber) {
    creditCard.creditCardNumber = `${creditCardNumber}`;
  }
  if (cvvResultCode) {
    creditCard.cvvResultCode = `${cvvResultCode}`.substr(0, 36);
  }
  if (gateway) {
    creditCard.gateway = gateway.substr(0, 100);
  }
  creditCard.transactionType = stringToCreditCardTransactionType(transactionType);
  return creditCard;
};
