import { expect, use } from 'chai';
import 'mocha';
import { getCountryCodeFromCountryName, getCountryNameFromCountryCode } from './countryCode';

interface Assertion {
  input?: string;
  output: string;
}

const countryCodes: Assertion[] = [
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

const countryNames: Assertion[] = [
  {
    input: 'United States of America',
    output: 'US',
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

describe('country name suite', () => {
  countryCodes.forEach((test) => {
    it(`converts "${test.input}" to "${test.output}"`, () => {
      const convert = getCountryNameFromCountryCode(test.input);
      expect(convert).to.equal(test.output);
    });
  });
  countryNames.forEach((test) => {
    it(`converts "${test.input}" to "${test.output}"`, () => {
      const convert = getCountryCodeFromCountryName(test.input);
      expect(convert).to.equal(test.output);
    });
  });
});
