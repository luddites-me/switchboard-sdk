import { testSdkStringConversion } from '@ns8/protect-tools-js';

import { getCountryCodeFromCountryName, getCountryNameFromCountryCode } from './countryCode';

/**
 * Basic data structure for tests
 */
interface Assertion {
  input?: string;
  assert: string;
}

/**
 * Input/Output sets for Country Code data tests
 */
const countryCodes: Assertion[] = [
  {
    input: 'us',
    assert: 'United States of America',
  },
  {
    input: 'unknown',
    assert: '',
  },
  {
    input: '',
    assert: '',
  },
  {
    assert: '',
  },
];

/**
 * Input/Output sets for Country Name data tests
 */
const countryNames: Assertion[] = [
  {
    input: 'United States of America',
    assert: 'US',
  },
  {
    input: 'unknown',
    assert: '',
  },
  {
    input: '',
    assert: '',
  },
  {
    assert: '',
  },
];

testSdkStringConversion({
  conversionFunction: async (input) => getCountryNameFromCountryCode(input),
  strings: countryCodes,
  targetString: 'country code',
});

testSdkStringConversion({
  conversionFunction: async (input) => getCountryCodeFromCountryName(input),
  strings: countryNames,
  targetString: 'country name',
});
