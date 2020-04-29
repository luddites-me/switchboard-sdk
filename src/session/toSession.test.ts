/* eslint-disable no-unused-expressions */
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { SessionData, toSession } from './toSession';

/**
 * Describes how Session data sets should look for test assertions
 * @internal
 */
export interface SessionDataAssertion {
  input: SessionData;
  assert: string;
}

/**
 * Assertions to test for Session data logic
 * @internal
 */
export const sessionAssertionMocks: SessionDataAssertion[] = [
  {
    input: {
      acceptLanguage: 'en',
      ip: '127.0.0.1',
      screenHeight: 400,
      screenWidth: 800,
      userAgent: 'mozilla',
    },
    assert: 'ip',
  },
  {
    input: {
      ip: '127.0.0.1',
      userAgent: 'mozilla',
    },
    assert: 'ip',
  },
  {
    input: {
      ip: '',
      userAgent: 'mozilla',
    },
    assert: 'throws',
  },
  {
    input: {
      ip: '127.0.0.1',
      userAgent: '',
    },
    assert: 'throws',
  },
];

describe('session convert suite', () => {
  use(chaiAsPromised);
  sessionAssertionMocks.forEach((test) => {
    it(`converts SessionData to Session matching ${test.assert}`, () => {
      if (test.assert === 'throws') {
        expect(() => toSession(test.input)).to.throw();
      } else {
        const convert = toSession(test.input);
        expect(convert[test.assert]).to.not.be.undefined;
      }
    });
  });
});
