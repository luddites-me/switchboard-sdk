import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { formatPhoneNumber } from './phoneNumber';

interface Assertion {
  input?: string;
  output: string;
  countryCode?: string;
}

const tests: Assertion[] = [
  {
    input: '(216) 208-0460',
    output: '+12162080460',
    countryCode: 'us',
  },
  {
    input: '(216) 208-0460',
    output: '(216) 208-0460',
  },
  {
    input: '020 7183 8750',
    output: '020 7183 8750',
    countryCode: 'uk',
  },
  {
    input: '',
    output: '',
  },
  {
    output: '',
  },
];

describe('phone number suite', () => {
  use(chaiAsPromised);
  tests.forEach((test) => {
    it(`converts "${test.input}" to "${test.output}" as countryCode: ${test.countryCode}`, () => {
      const convert = formatPhoneNumber(test.input, test.countryCode);
      expect(convert).to.equal(test.output);
    });
  });
});
