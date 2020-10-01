import { Customer } from '..';
import { getGender } from './gender';
import { getUniqueCustomerId } from './customerId';
import { toDate } from '../util';

/**
 * Generic object representing a customer.
 * @remarks
 * All properties are optional unless otherwise documented.
 * @public
 */
export interface CustomerData {
  birthday?: string | Date;
  /**
   * Max length: 200
   */
  company?: string;
  /**
   * Max length: 254
   */
  email?: string;
  /**
   * Max length: 50
   */
  firstName?: string;
  /**
   * Max length: 1
   */
  gender?: string;
  /**
   * This is normally set internally.
   * This should not generally be integrations.
   */
  isEmailVerified?: boolean;
  isPayingCustomer?: boolean;
  /**
   * Required. Max length: 50
   */
  lastName: string;
  /**
   * Max length: 200
   */
  phone?: string | number;
  /**
   * Date/Time the Customer was created.
   */
  platformCreatedAt?: string | Date;
  /**
   * This should be the platform's Customer Id:
   *  the unique Id that identifies a customer.
   * If not supplied, a UUID will be generated.
   * Max Length: 100
   */
  platformId?: string | number;
  totalSpent?: string | number;
}

/**
 * Converts a generic object representing a customer into a Protect model
 * @param data - generic data structure representing a customer
 * @public
 */
/* eslint-disable-next-line complexity */
export const toCustomer = (data: CustomerData): Customer => {
  const {
    birthday,
    company,
    email,
    firstName,
    gender,
    isEmailVerified,
    isPayingCustomer,
    lastName,
    phone,
    platformCreatedAt,
    platformId,
    totalSpent,
  } = data;
  const customer = new Customer({ lastName: lastName.substr(0, 50) });
  const birthdayDate = toDate(birthday);
  if (birthdayDate) {
    customer.birthday = birthdayDate;
  }
  if (company) {
    customer.company = company.substr(0, 200);
  }
  if (email) {
    customer.email = email.substr(0, 254);
  }
  if (firstName) {
    customer.firstName = firstName.substr(0, 50);
  }
  customer.gender = getGender(gender);
  if (phone) {
    customer.phone = `${phone}`.substr(0, 200);
  }
  if (platformId) {
    customer.platformId = `${platformId}`.substr(0, 100);
  } else {
    customer.platformId = getUniqueCustomerId('', email?.substr(0, 100) || '');
  }
  if (isEmailVerified) {
    customer.isEmailVerified = isEmailVerified;
  }
  if (isPayingCustomer) {
    customer.isPayingCustomer = isPayingCustomer;
  }
  if (platformCreatedAt) {
    customer.platformCreatedAt = toDate(platformCreatedAt);
  }
  if (totalSpent) {
    customer.totalSpent = +totalSpent;
  }
  return customer;
};
