import { testSdkEnumConversion } from '@ns8/protect-tools-js';
import { TransactionStatus } from 'ns8-protect-models';
import { stringToTransactionStatus } from './transactionStatus';

/**
 * Describes how Transaction Status sets should look for test assertions
 * @internal
 */
interface Assertion {
  input?: string;
  assert: TransactionStatus;
}

/**
 * Assertions to test for Transaction Status logic
 * @internal
 */
const tests: Assertion[] = [
  {
    input: 'error',
    assert: TransactionStatus.ERROR,
  },
  {
    input: 'failure',
    assert: TransactionStatus.FAILURE,
  },
  {
    input: 'failed',
    assert: TransactionStatus.FAILURE,
  },
  {
    input: 'pending',
    assert: TransactionStatus.PENDING,
  },
  {
    input: 'processing',
    assert: TransactionStatus.PENDING,
  },
  {
    input: 'success',
    assert: TransactionStatus.SUCCESS,
  },
  {
    input: 'successful',
    assert: TransactionStatus.SUCCESS,
  },
  {
    input: 'unknown',
    assert: TransactionStatus.PENDING,
  },
  {
    assert: TransactionStatus.PENDING,
  },
];

testSdkEnumConversion({
  conversionFunction: stringToTransactionStatus,
  targetEnum: 'TransactionStatus',
  tests,
});
