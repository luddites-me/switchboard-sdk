import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { AddressType } from 'ns8-protect-models';
import { stringToProtectAddressType } from './addressType';

// Address Type tests
describe('address types', () => {
  use(chaiAsPromised);

  it('converts "billing" to an AddressType', async () => {
    const input = 'billing';
    const output = AddressType.BILLING;
    const convert = stringToProtectAddressType(input);
    expect(convert).to.equal(output);
  });

  it('converts "shipping" to an AddressType', async () => {
    const input = 'shipping';
    const output = AddressType.SHIPPING;
    const convert = stringToProtectAddressType(input);
    expect(convert).to.equal(output);
  });

  it('converts "device" to an AddressType', async () => {
    const input = 'device';
    const output = AddressType.DEVICE;
    const convert = stringToProtectAddressType(input);
    expect(convert).to.equal(output);
  });

  it('converts "unknown" to an AddressType', async () => {
    const input = 'unknown';
    const output = AddressType.DEVICE;
    const convert = stringToProtectAddressType(input);
    expect(convert).to.equal(output);
  });
});
