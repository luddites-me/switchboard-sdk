import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { CreditCardTransactionType } from 'ns8-protect-models';
import { stringToCreditCardTransactionType } from './creditCardTransactionType';

/**
 * Describes how Transaction data sets should look for test assertions
 * @internal
 */
interface Assertion {
  input?: string;
  output: CreditCardTransactionType;
}

/**
 * Assertions to test for Credit Card logic
 */
const tests: Assertion[] = [
  {
    input: 'authorization',
    output: CreditCardTransactionType.AUTHORIZATION,
  },
  {
    input: 'authorize',
    output: CreditCardTransactionType.AUTHORIZATION,
  },
  {
    input: 'capture',
    output: CreditCardTransactionType.CAPTURE,
  },
  {
    input: 'refund',
    output: CreditCardTransactionType.REFUND,
  },
  {
    input: 'sale',
    output: CreditCardTransactionType.SALE,
  },
  {
    input: 'order',
    output: CreditCardTransactionType.SALE,
  },
  {
    input: 'void',
    output: CreditCardTransactionType.VOID,
  },
  {
    input: 'unknown',
    output: CreditCardTransactionType.AUTHORIZATION,
  },
  {
    output: CreditCardTransactionType.AUTHORIZATION,
  },
];

describe('credit card transaction type suite', () => {
  use(chaiAsPromised);
  tests.forEach((test) => {
    it(`converts "${test.input}" to CreditCardTransactionType.${test.output.toUpperCase()}`, () => {
      const convert = stringToCreditCardTransactionType(test.input);
      expect(convert).to.equal(test.output);
    });
  });
});
