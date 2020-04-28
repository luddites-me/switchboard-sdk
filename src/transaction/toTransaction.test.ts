/* eslint-disable no-unused-expressions */
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { TransactionMethod, TransactionStatus } from 'ns8-protect-models';
import { TransactionData, toTransaction } from './toTransaction';
import { creditCardAssertionMocks } from './toCreditCard.test';

/**
 * Describes how Transaction data sets should look for test assertions
 * @internal
 */
export interface TransactionDataAssertion {
  input: TransactionData;
  assert: string;
}

const creditCard = creditCardAssertionMocks.map((mock) => mock.input)[0];
const baseDate = '01/01/1979';

/**
 * Assertions to test for Transaction logic
 * @internal
 */
export const transactionAssertionMocks: TransactionDataAssertion[] = [
  {
    input: {
      amount: 10,
      creditCard,
      currency: 'USD',
      method: '',
      platformId: 1,
      processedAt: baseDate,
      status: '',
      statusDetails: '',
    },
    assert: 'amount',
  },
  {
    input: {
      amount: 10,
      creditCard,
      currency: 'USD',
      method: TransactionMethod.BANK_WIRE,
      platformId: 1,
      processedAt: baseDate,
    },
    assert: 'currency',
  },
  {
    input: {
      amount: 10,
      creditCard,
      currency: 'USD',
      platformId: 1,
      processedAt: baseDate,
      status: TransactionStatus.PENDING,
      statusDetails: 'Pedning Approval',
    },
    assert: 'status',
  },
  {
    input: {
      status: TransactionStatus.PENDING,
      statusDetails: 'Pedning Approval',
      amount: 2,
      currency: 'EUR',
    },
    assert: 'status',
  },
];

describe('transaction convert suite', () => {
  use(chaiAsPromised);
  transactionAssertionMocks.forEach((test) => {
    it(`converts TransactionData to Transaction matching ${test.assert}`, () => {
      const convert = toTransaction(test.input);
      expect(convert[test.assert]).to.not.be.undefined;
    });
  });
});
