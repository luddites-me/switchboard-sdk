import {
  parsePhoneNumberFromString,
  CountryCode,
  PhoneNumber,
} from 'libphonenumber-js';
import { AddressType, TransactionMethod, TransactionStatus, CreditCardTransactionType } from "ns8-protect-models";

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

      case 'checkmo':
      case 'check':
        return TransactionMethod.CHECK;

      case 'moneyorder':
        return TransactionMethod.COD;

      default:
        return TransactionMethod.OTHER;
    }
  }

  public static stringToTransactionStatus = (type: string): TransactionStatus => {
    switch (type.toLowerCase().trim()) {
      case 'processing':
      case 'pending':
        return TransactionStatus.PENDING;

      case 'error':
        return TransactionStatus.ERROR;

      case 'successful':
      case 'success':
        return TransactionStatus.SUCCESS;

      case 'failed':
      case 'failure':
        return TransactionStatus.FAILURE;

      default:
        return TransactionStatus.PENDING;
    }
  }

  public static stringToCreditCardTransactionType = (type: string): CreditCardTransactionType => {
    switch (type.toLowerCase().trim()) {
      case 'authorization':
        return CreditCardTransactionType.AUTHORIZATION;

      case 'capture':
        return CreditCardTransactionType.CAPTURE;

      case 'refund':
        return CreditCardTransactionType.REFUND;

      case 'sale':
        return CreditCardTransactionType.SALE;

      case 'void':
        return CreditCardTransactionType.VOID;

      default:
        return CreditCardTransactionType.AUTHORIZATION;
    }

  }
}