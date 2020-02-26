/* eslint-disable no-console */
import { CountryCode, PhoneNumber, parsePhoneNumberFromString } from 'libphonenumber-js';

/**
 * Generic utility to format a phone number in E.164 format
 * @param phoneNumberString - phone number to try to parse
 * @param countryCode - a country code, like 'US' to attempt to parse
 * @returns an E.164 formatted phone number string or an empty string if failed to parse
 */
export const formatPhoneNumber = (phoneNumberString = '', countryCode = ''): string => {
  let phoneNumber: PhoneNumber | undefined;
  let e164PhoneNumberString: string = phoneNumberString;

  try {
    if (phoneNumberString) {
      phoneNumber = parsePhoneNumberFromString(phoneNumberString, countryCode?.toUpperCase() as CountryCode);
    }
  } catch (e) {
    console.log('Could not format phone number: ', e);
  }

  if (phoneNumber && phoneNumber.number) {
    e164PhoneNumberString = phoneNumber.format('E.164');
  }
  return e164PhoneNumberString || '';
};
