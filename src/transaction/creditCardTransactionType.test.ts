import { CreditCardTransactionType } from '..';
import { testSdkEnumConversion } from '@luddites-me/ts-tools';

import { stringToCreditCardTransactionType } from './creditCardTransactionType';

/**
 * Describes how Transaction data sets should look for test assertions
 * @public
 */
interface Assertion {
  input?: string;
  assert: CreditCardTransactionType;
}

/**
 * Assertions to test for Credit Card logic
 */
const tests: Assertion[] = [
  {
    input: 'authorization',
    assert: CreditCardTransactionType.AUTHORIZATION,
  },
  {
    input: 'authorize',
    assert: CreditCardTransactionType.AUTHORIZATION,
  },
  {
    input: 'capture',
    assert: CreditCardTransactionType.CAPTURE,
  },
  {
    input: 'refund',
    assert: CreditCardTransactionType.REFUND,
  },
  {
    input: 'sale',
    assert: CreditCardTransactionType.SALE,
  },
  {
    input: 'order',
    assert: CreditCardTransactionType.SALE,
  },
  {
    input: 'void',
    assert: CreditCardTransactionType.VOID,
  },
  {
    input: 'unknown',
    assert: CreditCardTransactionType.AUTHORIZATION,
  },
  {
    assert: CreditCardTransactionType.AUTHORIZATION,
  },
];

testSdkEnumConversion({
  conversionFunction: async (input) => stringToCreditCardTransactionType(input),
  targetEnum: 'CreditCardTransactionType',
  tests,
});
