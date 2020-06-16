/* eslint-disable sonarjs/no-duplicate-string */

import { testSdkModelConversion } from '@ns8/protect-tools-js';

import { CustomerData, toCustomer } from './toCustomer';

/**
 * Describes how Customer data sets should look for test assertions
 * @public
 */
export interface CustomerDataAssertion {
  input: CustomerData;
  assert: string;
}

/**
 * Assertions to test for Customer data logic
 * @public
 */
export const customerAssertionMocks: CustomerDataAssertion[] = [
  {
    input: {
      birthday: '01/01/1979',
      company: 'My Co',
      email: 'a@b.com',
      firstName: 'Bob',
      lastName: 'Smith',
      gender: '1',
      phone: '800555555',
      platformId: 9,
    },
    assert: 'birthday',
  },
  {
    input: {
      birthday: new Date('01/01/1979'),
      company: 'My Co',
      email: 'a@b.com',
      firstName: 'Bob',
      lastName: 'Smith',
      gender: '1',
      phone: '800555555',
      platformId: 9,
    },
    assert: 'birthday',
  },
  {
    input: {
      company: 'My Co',
      email: 'a@b.com',
      firstName: 'Bob',
      lastName: 'Smith',
    },
    assert: 'firstName',
  },
  {
    input: {
      company: 'My Co',
      platformId: '123',
      email: '',
      firstName: 'Bob',
      lastName: 'Smith',
    },
    assert: 'firstName',
  },
  {
    input: {
      company: 'My Co',
      email: '',
      firstName: 'Bob',
      lastName: 'Smith',
    },
    assert: 'firstName',
  },
  {
    input: {
      company: 'My Co',
      email: '',
      firstName: 'Bob',
      lastName: 'Smith',
      isEmailVerified: true,
      isPayingCustomer: true,
      totalSpent: 5000,
      platformCreatedAt: '12/12/1980',
    },
    assert: 'firstName',
  },
  {
    input: {
      company: 'My Co',
      email: '',
      lastName: 'Smith',
      isEmailVerified: true,
      isPayingCustomer: true,
      totalSpent: 5000,
      platformCreatedAt: '12/12/1980',
    },
    assert: 'lastName',
  },
  {
    input: {
      company: 'My Co',
      lastName: 'Smith',
      isEmailVerified: true,
      isPayingCustomer: true,
      totalSpent: 5000,
      platformCreatedAt: '12/12/1980',
    },
    assert: 'lastName',
  },
];

testSdkModelConversion({
  conversionFunction: async (input) => toCustomer(input),
  mocks: customerAssertionMocks,
  targetModel: 'Customer',
});
