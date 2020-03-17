/* eslint-disable no-unused-expressions */
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { CustomerData, toCustomer } from './toCustomer';

export interface CustomerDataAssertion {
  input: CustomerData;
  assert: string;
}

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
];

describe('customer convert suite', () => {
  use(chaiAsPromised);
  customerAssertionMocks.forEach((test) => {
    it(`converts CustomerData to Customer matching ${test.assert}`, () => {
      const convert = toCustomer(test.input);
      expect(convert[test.assert]).to.not.be.undefined;
    });
  });
});
