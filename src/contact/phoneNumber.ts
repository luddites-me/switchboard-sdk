/* eslint-disable no-console */
import { CountryCode, PhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * Generic utility to format a phone number in E.164 format
 * @param phoneNumberString - phone number to try to parse
 * @param countryCode - a country code, like 'US' to attempt to parse
 * @returns an E.164 formatted phone number string or an empty string if failed to parse
 */
export const formatPhoneNumber = (phoneNumberString: string | number = '', countryCode = ''): string => {
  let phoneNumber: PhoneNumber | undefined;
  let e164PhoneNumberString = `${phoneNumberString}`;

  if (phoneNumberString) {
    if (countryCode) {
      phoneNumber = parsePhoneNumberFromString(`${phoneNumberString}`, countryCode.toUpperCase() as CountryCode);
    } else {
      phoneNumber = parsePhoneNumberFromString(`${phoneNumberString}`);
    }
  }
  if (phoneNumber && phoneNumber.number) {
    e164PhoneNumberString = phoneNumber.format('E.164');
  }
  return e164PhoneNumberString;
};
