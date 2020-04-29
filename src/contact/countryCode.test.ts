import { expect, use } from 'chai';
import 'mocha';
import { getCountryCodeFromCountryName, getCountryNameFromCountryCode } from './countryCode';

/**
 * Basic data structure for tests
 */
interface Assertion {
  input?: string;
  output: string;
}

/**
 * Input/Output sets for Country Code data tests
 */
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

/**
 * Input/Output sets for Country Name data tests
 */
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
