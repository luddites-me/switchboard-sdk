import { Customer } from 'ns8-protect-models';
import { getGender } from './gender';
import { getUniqueCustomerId } from './customerId';
import { toDate } from '../util';

/**
 * Generic object representing a credit card.
 * All properties are optional unless otherwise documented.
 */
export interface CustomerData {
  birthday?: string | Date;
  company?: string;
  email?: string;
  firstName?: string;
  gender?: string;
  /**
   * This is normally set internally.
   * This should not generally be integrations.
   */
  isEmailVerified?: boolean;
  isPayingCustomer?: boolean;
  /**
   * Required.
   */
  lastName: string;
  phone?: string | number;
  /**
   * Date/Time the Customer was created.
   * @default now
   */
  platformCreatedAt?: string | Date;
  /**
   * This should be the platform's Customer Id:
   *  the unique Id that identifies a customer.
   * If not supplied, a UUID will be generated.
   * @default new UUID
   */
  platformId?: string | number;
  totalSpent?: string | number;
}

/**
 * Converts a generic object representing a customer into a Protect model
 * @param data - generic data structure representing a customer
 */
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
  const customer = new Customer({ email, company, firstName, lastName });
  const birthdayDate = toDate(birthday);
  if (birthdayDate) {
    customer.birthday = birthdayDate;
  }
  customer.gender = getGender(gender);
  if (phone) {
    customer.phone = `${phone}`;
  }
  if (platformId) {
    customer.platformId = getUniqueCustomerId(`${platformId}`, email || '');
  } else {
    customer.platformId = getUniqueCustomerId('', email || '');
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
