/* eslint-disable no-unused-expressions */
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { getUniqueCustomerId } from './customerId';

interface CustomerIdDataAssertion {
  id: string;
  email: string;
}

const customerIdAssertionMocks: CustomerIdDataAssertion[] = [
  {
    id: '',
    email: '',
  },
  {
    id: '',
    email: 'foo@bar.com',
  },
  {
    id: '1',
    email: '',
  }
];

describe('customer convert suite', () => {
  use(chaiAsPromised);
  customerIdAssertionMocks.forEach(test => {
    it(`ensures customer id is generated matching ${test.id}`, () => {
      const convert = getUniqueCustomerId(test.id, test.email);
      expect(convert).to.not.be.undefined;
    });
  });
});
