import { testSdkEnumConversion } from '@ns8/protect-tools-js';
import { TransactionMethod } from 'ns8-protect-models';
import { stringToTransactionMethod } from './transactionMethod';

/**
 * Describes how Transaction Method sets should look for test assertions
 * @internal
 */
interface Assertion {
  input?: string;
  assert: TransactionMethod;
}

/**
 * Assertions to test for Transaction Method logic
 * @internal
 */
const tests: Assertion[] = [
  {
    input: 'bankwire',
    assert: TransactionMethod.BANK_WIRE,
  },
  {
    input: 'cc',
    assert: TransactionMethod.CC,
  },
  {
    input: 'creditcard',
    assert: TransactionMethod.CC,
  },
  {
    input: 'check',
    assert: TransactionMethod.CHECK,
  },
  {
    input: 'checkmo',
    assert: TransactionMethod.CHECK,
  },
  {
    input: 'check',
    assert: TransactionMethod.CHECK,
  },
  {
    input: 'cod',
    assert: TransactionMethod.COD,
  },
  {
    input: 'cashondelivery',
    assert: TransactionMethod.COD,
  },
  {
    input: 'moneyorder',
    assert: TransactionMethod.COD,
  },
  {
    input: 'other',
    assert: TransactionMethod.OTHER,
  },
  {
    input: '',
    assert: TransactionMethod.OTHER,
  },
  {
    assert: TransactionMethod.OTHER,
  },
];

testSdkEnumConversion({
  conversionFunction: async (input) => stringToTransactionMethod(input),
  targetEnum: 'TransactionMethod',
  tests,
});
