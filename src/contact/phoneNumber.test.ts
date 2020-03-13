import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { formatPhoneNumber } from './phoneNumber';

interface Assertion {
  input?: string;
  output: string;
  countryCode?: string;
}

const inputUsNumber = '(216) 208-0460';
const inputUkNumber = '020 7183 8750';

const tests: Assertion[] = [
  {
    input: inputUsNumber,
    output: '+12162080460',
    countryCode: 'us',
  },
  {
    input: inputUsNumber,
    output: inputUsNumber,
  },
  {
    input: inputUkNumber,
    output: inputUkNumber,
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
