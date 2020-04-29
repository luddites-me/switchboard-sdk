import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { TransactionMethod } from 'ns8-protect-models';
import { stringToTransactionMethod } from './transactionMethod';

/**
 * Describes how Transaction Method sets should look for test assertions
 * @internal
 */
interface Assertion {
  input?: string;
  output: TransactionMethod;
}

/**
 * Assertions to test for Transaction Method logic
 * @internal
 */
const tests: Assertion[] = [
  {
    input: 'bankwire',
    output: TransactionMethod.BANK_WIRE,
  },
  {
    input: 'cc',
    output: TransactionMethod.CC,
  },
  {
    input: 'creditcard',
    output: TransactionMethod.CC,
  },
  {
    input: 'check',
    output: TransactionMethod.CHECK,
  },
  {
    input: 'checkmo',
    output: TransactionMethod.CHECK,
  },
  {
    input: 'check',
    output: TransactionMethod.CHECK,
  },
  {
    input: 'cod',
    output: TransactionMethod.COD,
  },
  {
    input: 'cashondelivery',
    output: TransactionMethod.COD,
  },
  {
    input: 'moneyorder',
    output: TransactionMethod.COD,
  },
  {
    input: 'other',
    output: TransactionMethod.OTHER,
  },
  {
    input: '',
    output: TransactionMethod.OTHER,
  },
  {
    output: TransactionMethod.OTHER,
  },
];

describe('transaction method suite', () => {
  use(chaiAsPromised);
  tests.forEach((test) => {
    it(`converts "${test.input}" to CreditCardTransactionType.${test.output.toUpperCase()}`, () => {
      const convert = stringToTransactionMethod(test.input);
      expect(convert).to.equal(test.output);
    });
  });
});
