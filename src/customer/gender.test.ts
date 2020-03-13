import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { getGender } from './gender';
import { Gender } from '../enums/Gender';

interface Assertion {
  input?: string | number;
  output: Gender;
}

const tests: Assertion[] = [
  {
    input: 1,
    output: Gender.MALE,
  },
  {
    input: 2,
    output: Gender.FEMALE,
  },
  {
    input: 0,
    output: Gender.UNKNOWN,
  },
  {
    input: 'm',
    output: Gender.MALE,
  },
  {
    input: 'f',
    output: Gender.FEMALE,
  },
  {
    output: Gender.UNKNOWN,
  },
  {
    input: 'male',
    output: Gender.MALE,
  },
  {
    input: 'female',
    output: Gender.FEMALE,
  },
  {
    input: 'undefined',
    output: Gender.UNKNOWN,
  },
];

describe('gender suite', () => {
  use(chaiAsPromised);
  tests.forEach((test) => {
    it(`converts "${test.input}" to Gender.${test.output.toUpperCase()}`, () => {
      const convert = getGender(test.input);
      expect(convert).to.equal(test.output);
    });
  });
});
