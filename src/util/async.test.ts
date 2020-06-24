/* eslint-disable no-unused-expressions */
import { SdkTestAssertionType, testExecutionTime, testSdkAssertion } from '@ns8/protect-tools-js';
import { asyncForEach, sleep } from './async';

testExecutionTime('sleeps for 5000ms', sleep, 5000);

testSdkAssertion({
  name: 'asyncForEach Suite',
  assertions: [
    {
      name: 'async operates over every member of an array',
      assertionFunction: async () => {
        return asyncForEach([1, 2, 3, 4], async (i: number) => {
          return i > 0;
        });
      },
      assertion: SdkTestAssertionType.TO_NOT_THROW,
    },
    {
      name: 'async operates over empty array',
      assertionFunction: async () => {
        return asyncForEach([], async (i: number) => {
          return i;
        });
      },
      assertion: SdkTestAssertionType.TO_NOT_THROW,
    },
    {
      name: 'async operates over null params',
      assertionFunction: async () => {
        return asyncForEach();
      },
      assertion: SdkTestAssertionType.TO_NOT_THROW,
    },
  ],
});
