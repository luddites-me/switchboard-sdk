import { expect, use } from 'chai';
import 'mocha';
import { getCountryNameFromCountryCode } from './countryCode';

interface Assertion {
  input?: string;
  output: string;
}

const tests: Assertion[] = [
  {
    input: 'us',
    output: 'United States of America',
  },
  {
    input: 'unknown',
    output: '',
  },
  {
    input: '',
    output: '',
  },
  {
    output: '',
  },
];

describe('country code suite', () => {
  tests.forEach((test) => {
    it(`converts "${test.input}" to "${test.output}"`, () => {
      const convert = getCountryNameFromCountryCode(test.input);
      expect(convert).to.equal(test.output);
    });
  });
});
