/* eslint-disable no-unused-expressions */
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { SessionData, toSession } from './toSession';

export interface SessionDataAssertion {
  input: SessionData;
  assert: string;
}

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
        const badFn = function() {
          toSession(test.input);
        };
        // This does not execute the method; which requires an unfortunate istanbul ignore in the two cases that are not covered
        expect(badFn).to.throw;
      } else {
        const convert = toSession(test.input);
        expect(convert[test.assert]).to.not.be.undefined;
      }
    });
  });
});
