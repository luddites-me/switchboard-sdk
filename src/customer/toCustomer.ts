import { Customer } from 'ns8-protect-models';
import { toDate } from '../util';
import { getGender } from './gender';

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
    customer.platformId = `${platformId}`;
  }
  return customer;
};
