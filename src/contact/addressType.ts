import { AddressType } from 'ns8-protect-models';

/**
 * Safely converts a string to an AddressType
 * @param addressType - An address type to attempt to parse
 * @returns AddressType; defaults to 'DEVICE' if not parsable
 * @public
 */
export const stringToProtectAddressType = (addressType = ''): AddressType => {
  switch (addressType.toLowerCase().trim()) {
    case 'billing':
      return AddressType.BILLING;
    case 'shipping':
      return AddressType.SHIPPING;
    case 'device':
      return AddressType.DEVICE;
    default:
      return AddressType.DEVICE;
  }
};
