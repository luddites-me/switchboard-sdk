import { testSdkEnumConversion } from '@ns8/protect-tools-js';

import { getGender } from './gender';
import { Gender } from '../enums/Gender';

/**
 * Describes how data sets should look for gender assertions
 */
interface Assertion {
  input?: string | number;
  assert: Gender;
}

/**
 * Test data to validate gender logic
 */
const tests: Assertion[] = [
  {
    input: 1,
    assert: Gender.MALE,
  },
  {
    input: 2,
    assert: Gender.FEMALE,
  },
  {
    input: 0,
    assert: Gender.UNKNOWN,
  },
  {
    input: 'm',
    assert: Gender.MALE,
  },
  {
    input: 'f',
    assert: Gender.FEMALE,
  },
  {
    assert: Gender.UNKNOWN,
  },
  {
    input: 'male',
    assert: Gender.MALE,
  },
  {
    input: 'female',
    assert: Gender.FEMALE,
  },
  {
    input: 'undefined',
    assert: Gender.UNKNOWN,
  },
];

testSdkEnumConversion({
  conversionFunction: getGender,
  targetEnum: 'Gender',
  tests,
});
