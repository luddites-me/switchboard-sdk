import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { AddressType } from 'ns8-protect-models';
import { stringToProtectAddressType } from './addressType';

interface AddressAssertion {
  input?: string;
  output: AddressType;
}

export const tests: AddressAssertion[] = [
  {
    input: 'billing',
    output: AddressType.BILLING,
  },
  {
    input: 'shipping',
    output: AddressType.SHIPPING,
  },
  {
    input: 'device',
    output: AddressType.DEVICE,
  },
  {
    output: AddressType.DEVICE,
  },
  {
    input: 'unknown',
    output: AddressType.DEVICE,
  },
  {
    input: '',
    output: AddressType.DEVICE,
  },
];

describe('address type suite', () => {
  use(chaiAsPromised);
  tests.forEach((test) => {
    it(`converts "${test.input}" to AddressType.${test.output.toUpperCase()}`, () => {
      const convert = stringToProtectAddressType(test.input);
      expect(convert).to.equal(test.output);
    });
  });
});
