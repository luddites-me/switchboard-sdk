import { testSdkModelConversion } from '@ns8/protect-tools-js';
import { TransactionMethod, TransactionStatus } from 'ns8-protect-models';
import { TransactionData, toTransaction } from './toTransaction';
import { creditCardAssertionMocks } from './toCreditCard.test';

/**
 * Describes how Transaction data sets should look for test assertions
 * @public
 */
export interface TransactionDataAssertion {
  input: TransactionData;
  assert: string;
}

const creditCard = creditCardAssertionMocks.map((mock) => mock.input)[0];
const baseDate = '01/01/1979';

/**
 * Assertions to test for Transaction logic
 * @public
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

testSdkModelConversion({
  conversionFunction: async (input) => toTransaction(input),
  mocks: transactionAssertionMocks,
  targetModel: 'Transaction',
});
