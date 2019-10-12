import {
  AddressType,
  CreditCardTransactionType,
  TransactionMethod,
  TransactionStatus
  } from 'ns8-protect-models';
import { Logger } from './Logger';
import {
  parsePhoneNumberFromString,
  CountryCode,
  PhoneNumber,
} from 'libphonenumber-js';

export class ModelTools {

  /**
   * Generic utility to format a phone number correctly
   */
  public static formatPhoneNumber = (phoneNumberString: string | undefined, countryCode?: string | undefined): string | undefined => {
    let phoneNumber: PhoneNumber | undefined;
    let e164PhoneNumberString: string | undefined = phoneNumberString;

    try {
      if (phoneNumberString) {
        phoneNumber = parsePhoneNumberFromString(phoneNumberString, countryCode as CountryCode);
      }
    } catch (e) {
      Logger.log('Could not format phone number: ', e);
    }

    if (phoneNumber && phoneNumber.number) {
      e164PhoneNumberString = phoneNumber.format('E.164');
    }

    return e164PhoneNumberString;
  };

  /**
   * Safely converts a string to an [[AddressType]]
   * @param type
  */
  public static stringToProtectAddressType = (type: string | undefined): AddressType => {
    if (!type) return AddressType.DEVICE;

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

  /**
  * Safely converts a string to a [[TransactionMethod]]
  * @param type
  */
  public static stringToTransactionMethod = (type: string | undefined): TransactionMethod => {
    if (!type) return TransactionMethod.OTHER;

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

  /**
  * Safely converts a string to a [[TransactionStatus]]
  * @param type
  */
  public static stringToTransactionStatus = (type: string | undefined): TransactionStatus => {
    if (!type) return TransactionStatus.PENDING;

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

  /**
  * Safely converts a string to a [[CreditCardTransactionType]]
  * @param type
  */
  public static stringToCreditCardTransactionType = (type: string | undefined): CreditCardTransactionType => {
    if (!type) return CreditCardTransactionType.AUTHORIZATION;

    switch (type.toLowerCase().trim()) {
      case 'authorization':
        return CreditCardTransactionType.AUTHORIZATION;

      case 'capture':
        return CreditCardTransactionType.CAPTURE;

      case 'refund':
        return CreditCardTransactionType.REFUND;

      case 'order':
      case 'sale':
        return CreditCardTransactionType.SALE;

      case 'void':
        return CreditCardTransactionType.VOID;

      default:
        return CreditCardTransactionType.AUTHORIZATION;
    }
  }
}
