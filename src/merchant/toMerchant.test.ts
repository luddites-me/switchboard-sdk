/* eslint-disable no-unused-expressions */
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { MerchantData, toMerchant } from './toMerchant';

export interface MerchantDataAssertion {
  input: MerchantData;
  assert: string;
}

export const merchantAssertionMocks: MerchantDataAssertion[] = [
  {
    input: {
      contact: {
        email: 'foo@bar.com',
        firstName: 'Foo',
        lastName: 'Bar',
        name: 'Foo Bar',
        phone: '(800) 555-5555',
      },
      name: 'Merchant 1',
      storeFrontUrl: 'https://my.site.com',
    },
    assert: 'name'
  },
  {
    input: {
      contact: {
        firstName: 'Foo',
        lastName: 'Bar',
        name: 'Foo Bar',
        phone: '(800) 555-5555',
      },
      name: 'Merchant 1',
      storeFrontUrl: 'https://my.site.com',
    },
    assert: 'name'
  },
  {
    input: {
      contact: {
        email: 'foo@bar.com',
        lastName: 'Bar',
        name: 'Foo Bar',
        phone: '(800) 555-5555',
      },
    },
    assert: 'contact'
  },
  {
    input: {
      contact: {
        email: 'foo@bar.com',
        firstName: 'Foo',
      },
      name: 'Merchant 1',
      storeFrontUrl: 'https://my.site.com',
    },
    assert: 'name'
  },
  {
    input: {
      contact: {
        email: '',
      },
      name: 'Merchant 1',
      storeFrontUrl: 'https://my.site.com',
    },
    assert: 'name'
  },
  {
    input: {
      name: 'Merchant 1',
      storeFrontUrl: 'https://my.site.com',
    },
    assert: 'name'
  },
];

describe('merchant convert suite', () => {
  use(chaiAsPromised);
  merchantAssertionMocks.forEach(test => {
    it(`converts MerchantData to Merchant matching ${test.assert}`, () => {
      const convert = toMerchant(test.input);
      expect(convert[test.assert]).to.not.be.undefined;
    });
  });
});
