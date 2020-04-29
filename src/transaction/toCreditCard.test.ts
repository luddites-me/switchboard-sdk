/* eslint-disable no-unused-expressions */
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { CreditCardTransactionType } from 'ns8-protect-models';
import { CreditCardData, toCreditCard } from './toCreditCard';

/**
 * Describes how Credit Card data sets should look for test assertions
 * @internal
 */
export interface CreditCardAssertion {
  input: CreditCardData;
  assert: string;
}

/**
 * Assertions to test for Credit Card logic
 * @internal
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

describe('credit card convert suite', () => {
  use(chaiAsPromised);
  creditCardAssertionMocks.forEach((test) => {
    it(`converts CreditCardData to CreditCard matching ${test.assert}`, () => {
      const convert = toCreditCard(test.input);
      expect(convert[test.assert]).to.not.be.undefined;
    });
  });
});
