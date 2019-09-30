import {
  parsePhoneNumberFromString,
  CountryCode,
  PhoneNumber,
} from 'libphonenumber-js';
import { AddressType, TransactionMethod } from "ns8-protect-models";

export class ModelTools {

  /**
   * Generic utility to format a phone number correctly
   */
  public static formatPhoneNumber = (phoneNumberString: string, countryCode?: string): string => {
    let phoneNumber: PhoneNumber | undefined;
    let e164PhoneNumberString: string = phoneNumberString;

    try {
      phoneNumber = parsePhoneNumberFromString(phoneNumberString, countryCode as CountryCode);
    } catch (error) {
      console.log('Could not format phone number: ', error.toString());
    }

    if (phoneNumber && phoneNumber.number) {
      e164PhoneNumberString = phoneNumber.format('E.164');
    }

    return e164PhoneNumberString;
  };

  /**
 * Converts a string to an AddressType
 * @param type
 */
  public static stringToProtectAddressType = (type: string): AddressType => {
    switch (type.toLowerCase().trim()) {
      case 'billing':
        return AddressType.BILLING;
      case 'shipping':
        return AddressType.SHIPPING;
      case 'device':
        return AddressType.DEVICE;
      default:
        return AddressType.DEVICE;
    }
  }

  public static stringToTransactionMethod = (type: string): TransactionMethod => {
    switch (type.toLowerCase().trim()) {
      case 'bankwire':
        return TransactionMethod.BANK_WIRE;
      case 'creditcard':
        return TransactionMethod.CC;
      case 'check':
        return TransactionMethod.CHECK;
      case 'moneyorder':
        return TransactionMethod.COD;
      default:
        return TransactionMethod.OTHER;
    }
  }
}