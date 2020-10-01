/* eslint-disable sonarjs/no-duplicate-string */

import { testSdkModelConversion } from '@luddites-me/ts-tools';

import { MerchantData, toMerchant } from './toMerchant';

/**
 * Describes how Merchant data sets should look for test assertions
 * @public
 */
export interface MerchantDataAssertion {
  input: MerchantData;
  assert: string;
}

/**
 * Assertions to test for Merchant data logic
 * @public
 */
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
    assert: 'name',
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
    assert: 'name',
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
    assert: 'contact',
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
    assert: 'name',
  },
  {
    input: {
      contact: {
        email: '',
      },
      name: 'Merchant 1',
      storeFrontUrl: 'https://my.site.com',
    },
    assert: 'name',
  },
  {
    input: {
      name: 'Merchant 1',
      storeFrontUrl: 'https://my.site.com',
    },
    assert: 'name',
  },
];

testSdkModelConversion({
  conversionFunction: async (input) => toMerchant(input),
  mocks: merchantAssertionMocks,
  targetModel: 'Merchant',
});
