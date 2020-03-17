import { Customer } from 'ns8-protect-models';
import { getGender } from './gender';
import { getUniqueCustomerId } from './customerId';
import { toDate } from '../util';

export interface CustomerData {
  birthday?: string | Date;
  company?: string;
  email?: string;
  firstName?: string;
  gender?: string;
  lastName?: string;
  phone?: string | number;
  /**
   * platformId is required. If not supplied, a UUID will be generated.
   */
  platformId?: string | number;
}

/**
 * Converts a generic object representing a customer into a Protect model
 * @param data - generic data structure representing a customer
 */
export const toCustomer = (data: CustomerData): Customer => {
  const { birthday, company, email, firstName, gender, lastName, phone, platformId } = data;
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
  return customer;
};
