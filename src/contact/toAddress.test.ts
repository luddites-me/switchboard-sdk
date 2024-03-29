/* eslint-disable sonarjs/no-duplicate-string */

import { testSdkModelConversion } from '@luddites-me/ts-tools';

import { AddressData, toAddress } from './toAddress';

/**
 * Basic data structure for address data assertions
 * @public
 */
export interface AddressDataAssertion {
  input: AddressData;
  assert: string;
}

/**
 * Mock data utilizes for address testing
 * @public
 */
export const addressAssertionMocks: AddressDataAssertion[] = [
  {
    input: {
      address1: 'Any street',
      city: 'Ithaca',
      company: '',
      country: 'United States',
      countryCode: 'US',
      region: 'New York',
      type: 'billing',
      zip: '14850-2911',
    },
    assert: 'address1',
  },
  {
    input: {
      address1: 'Any street',
      city: 'Ithaca',
      company: '',
      countryCode: 'US',
      region: 'New York',
      type: 'billing',
      zip: '14850-2911',
    },
    assert: 'address1',
  },
  {
    input: {
      address1: 'Any street',
      city: 'Ithaca',
      company: '',
      countryCode: 'United States',
      region: 'New York',
      type: 'billing',
      zip: '14850-2911',
    },
    assert: 'address1',
  },
  {
    input: {
      address1: 'Any street',
      city: 'Ithaca',
      company: '',
      region: 'New York',
      type: 'billing',
      zip: '14850-2911',
    },
    assert: 'address1',
  },
  {
    input: {
      address1: 'Any street',
      city: 'Ithaca',
      company: '',
      country: 'US',
      countryCode: 'United States',
      region: 'New York',
      type: 'billing',
      zip: '14850-2911',
    },
    assert: 'address1',
  },
  {
    input: {
      address1: 'Any street',
      address2: 'Door 4',
      city: 'Ithaca',
      company: '',
      country: 'United States',
      countryCode: 'US',
      region: 'New York',
      type: 'billing',
      zip: '14850-2911',
    },
    assert: 'address2',
  },
  {
    input: {
      address1: 'Any street',
      city: 'Ithaca',
      company: '',
      country: 'United States',
      countryCode: 'US',
      region: 'New York',
      type: 'billing',
      zip: '14850-2911',
      latitude: '1.215',
    },
    assert: 'latitude',
  },
  {
    input: {
      address1: 'Any street',
      city: 'Ithaca',
      company: '',
      country: 'United States',
      countryCode: 'US',
      region: 'New York',
      type: 'billing',
      zip: '14850-2911',
      latitude: 1.123,
      longitude: '1.254',
    },
    assert: 'longitude',
  },
  {
    input: {
      address1: 'Any street',
      city: 'Ithaca',
      company: 'Textile Services',
      country: 'United States',
      countryCode: 'US',
      region: 'New York',
      type: 'billing',
      zip: '14850-2911',
      latitude: 1,
    },
    assert: 'company',
  },
  {
    input: {
      address1: 'Any street',
      city: 'Ithaca',
      company: 'Textile Services',
      country: 'United States',
      countryCode: 'US',
      region: 'New York',
      regionCode: 'NY',
      type: 'billing',
      zip: '14850-2911',
      latitude: 1,
    },
    assert: 'regionCode',
  },
  {
    input: {
      countryCode: 'US',
      region: 'North Carolina',
      type: 'billing',
    },
    assert: 'regionCode',
  },
  {
    input: {
      address1: 'Any street',
      company: 'Textile Services',
      name: 'My address',
      type: 'billing',
      latitude: 1,
    },
    assert: 'name',
  },
  {
    input: {
      company: 'Textile Services',
      name: 'My address',
      type: 'billing',
      latitude: 1,
    },
    assert: 'name',
  },
  {
    input: {
      company: 'Textile Services',
      type: 'billing',
      latitude: 1,
    },
    assert: 'company',
  },
];

testSdkModelConversion({
  conversionFunction: async (input) => toAddress(input),
  mocks: addressAssertionMocks,
  targetModel: 'Address',
});
