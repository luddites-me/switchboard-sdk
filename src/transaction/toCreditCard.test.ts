import { CreditCardTransactionType } from '..';
import { testSdkModelConversion } from '@luddites-me/ts-tools';

import { CreditCardData, toCreditCard } from './toCreditCard';

/**
 * Describes how Credit Card data sets should look for test assertions
 * @public
 */
export interface CreditCardAssertion {
  input: CreditCardData;
  assert: string;
}

/**
 * Assertions to test for Credit Card logic
 * @public
 */
export const creditCardAssertionMocks: CreditCardAssertion[] = [
  {
    input: {
      avsResultCode: '',
      cardExpiration: '',
      cardHolder: 'My Name',
      creditCardBin: '',
      creditCardCompany: 'Visa',
      creditCardNumber: '1234',
      cvvResultCode: '',
      gateway: '',
      transactionType: 'none',
    },
    assert: 'cardHolder',
  },
  {
    input: {
      avsResultCode: '123',
      cardExpiration: '01/29',
      cardHolder: 'My Name',
      creditCardBin: '456',
      creditCardCompany: 'Visa',
      creditCardNumber: '1234',
      cvvResultCode: '897',
      gateway: 'Braintree',
      transactionType: CreditCardTransactionType.AUTHORIZATION,
    },
    assert: 'transactionType',
  },
  {
    input: {
      avsResultCode: '123',
      cardExpiration: '01/29',
      creditCardBin: '456',
      cvvResultCode: '897',
      gateway: 'Braintree',
    },
    assert: 'gateway',
  },
];

testSdkModelConversion({
  conversionFunction: async (input) => toCreditCard(input),
  mocks: creditCardAssertionMocks,
  targetModel: 'CreditCard',
});
