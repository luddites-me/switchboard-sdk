import { AddressType } from 'ns8-protect-models';
import { testSdkEnumConversion } from '@ns8/protect-tools-js';

import { stringToProtectAddressType } from './addressType';

/**
 * Describes how test input/output sets should look for address assertions
 */
interface AddressAssertion {
  input?: string;
  assert: AddressType;
}

/**
 * Tests that validate contact address logic
 * @public
 */
export const tests: AddressAssertion[] = [
  {
    input: 'billing',
    assert: AddressType.BILLING,
  },
  {
    input: 'shipping',
    assert: AddressType.SHIPPING,
  },
  {
    input: 'device',
    assert: AddressType.DEVICE,
  },
  {
    assert: AddressType.DEVICE,
  },
  {
    input: 'unknown',
    assert: AddressType.DEVICE,
  },
  {
    input: '',
    assert: AddressType.DEVICE,
  },
];

testSdkEnumConversion({
  conversionFunction: async (input: string) => stringToProtectAddressType(input),
  targetEnum: 'AddressType',
  tests,
});
