import { testSdkModelConversion } from '@ns8/protect-tools-js';

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

testSdkModelConversion({
  conversionFunction: async (input) => toSession(input),
  mocks: sessionAssertionMocks,
  targetModel: 'Session',
});
