/* eslint-disable
  no-unused-expressions,
  @typescript-eslint/no-explicit-any,
*/
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import moment from 'moment';
import 'mocha';
import { isValidDate, toDate } from './date';

/**
 * Describes how date info sets should look for test assertions
 * @public
 */
interface Assertion {
  input?: any;
  output?: Date;
}

/**
 * Assertions to test for date logic
 */
const tests: Assertion[] = [
  {
    input: '01/01/1979',
    output: new Date('01/01/1979'),
  },
  {},
];

describe('date suite', () => {
  use(chaiAsPromised);
  tests.forEach((test) => {
    it(`converts ${test.input} to Date ${test.output}`, () => {
      const convert = toDate(test.input);
      const isValid = isValidDate(convert);
      if (test.input) {
        const dateIn = moment(convert).format('MM/DD/YYYY');
        const dateOut = moment(test.output).format('MM/DD/YYYY');
        expect(dateIn).to.equal(dateOut);
        expect(isValid).to.be.true;
      } else {
        expect(convert).to.be.undefined;
        expect(isValid).to.be.false;
      }
    });
  });
});
