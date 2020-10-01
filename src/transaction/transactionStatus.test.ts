import { testSdkEnumConversion } from '@luddites-me/ts-tools';
import { TransactionStatus } from '..';
import { stringToTransactionStatus } from './transactionStatus';

/**
 * Describes how Transaction Status sets should look for test assertions
 * @public
 */
interface Assertion {
  input?: string;
  assert: TransactionStatus;
}

/**
 * Assertions to test for Transaction Status logic
 * @public
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
  conversionFunction: async (input) => stringToTransactionStatus(input),
  targetEnum: 'TransactionStatus',
  tests,
});
