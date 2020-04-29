import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { TransactionStatus } from 'ns8-protect-models';
import { stringToTransactionStatus } from './transactionStatus';

/**
 * Describes how Transaction Status sets should look for test assertions
 * @internal
 */
interface Assertion {
  input?: string;
  output: TransactionStatus;
}

/**
 * Assertions to test for Transaction Status logic
 * @internal
 */
const tests: Assertion[] = [
  {
    input: 'error',
    output: TransactionStatus.ERROR,
  },
  {
    input: 'failure',
    output: TransactionStatus.FAILURE,
  },
  {
    input: 'failed',
    output: TransactionStatus.FAILURE,
  },
  {
    input: 'pending',
    output: TransactionStatus.PENDING,
  },
  {
    input: 'processing',
    output: TransactionStatus.PENDING,
  },
  {
    input: 'success',
    output: TransactionStatus.SUCCESS,
  },
  {
    input: 'successful',
    output: TransactionStatus.SUCCESS,
  },
  {
    input: 'unknown',
    output: TransactionStatus.PENDING,
  },
  {
    output: TransactionStatus.PENDING,
  },
];

describe('transaction status suite', () => {
  use(chaiAsPromised);
  tests.forEach((test) => {
    it(`converts "${test.input}" to TransactionStatus.${test.output.toUpperCase()}`, () => {
      const convert = stringToTransactionStatus(test.input);
      expect(convert).to.equal(test.output);
    });
  });
});
