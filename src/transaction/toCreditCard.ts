import { CreditCard } from 'ns8-protect-models';
import { stringToCreditCardTransactionType } from './creditCard';

export interface CreditCardData {
  avsResultCode?: string | number;
  cardExpiration?: string;
  cardHolder?: string;
  creditCardBin?: string | number;
  creditCardCompany?: string;
  creditCardNumber?: string | number;
  cvvResultCode?: string | number;
  gateway?: string;
  transactionType?: string;
}

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
  if (transactionType) {
    creditCard.transactionType = stringToCreditCardTransactionType(transactionType);
  }
  return creditCard;
};
