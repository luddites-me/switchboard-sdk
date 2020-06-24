/* eslint-disable
  no-unused-expressions,
  @typescript-eslint/no-explicit-any,
*/
import { SdkTestAssertionType, testSdkAssertion } from '@ns8/protect-tools-js';
import { isValidDate, toDate } from './date';

testSdkAssertion({
  name: 'date Suite',
  assertions: [
    {
      name: 'converts a date string to a Date',
      assertionFunction: async () => {
        const convert = toDate('01/01/1979');
        return isValidDate(convert);
      },
      assertion: SdkTestAssertionType.IS_TRUE,
    },
    {
      name: 'fails to convert an invalid date string to a Date',
      assertionFunction: async () => {
        const convert = toDate('NaN');
        return isValidDate(convert);
      },
      assertion: SdkTestAssertionType.IS_FALSE,
    },
    {
      name: 'fails to convert null to a Date',
      assertionFunction: async () => {
        return isValidDate(null);
      },
      assertion: SdkTestAssertionType.IS_FALSE,
    },
  ],
});
