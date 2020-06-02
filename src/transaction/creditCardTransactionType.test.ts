import { CreditCardTransactionType } from 'ns8-protect-models';
import { testSdkEnumConversion } from '@ns8/protect-tools-js';

import { stringToCreditCardTransactionType } from './creditCardTransactionType';

/**
 * Describes how Transaction data sets should look for test assertions
 * @internal
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
  conversionFunction: stringToCreditCardTransactionType,
  targetEnum: 'CreditCardTransactionType',
  tests,
});
