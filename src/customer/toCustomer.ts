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
  platformId?: string | number;
}

/**
 * Converts platform data to a strongly typed Customer object
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
