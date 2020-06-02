/* eslint-disable sonarjs/cognitive-complexity */

import { testSdkModelConversion } from '@ns8/protect-tools-js';

import { LineItemData, toLineItem } from './toLineItem';

/**
 * Describes how Line Item data sets should look for test assertions
 * @internal
 */
export interface LineItemDataAssertion {
  input: LineItemData;
  assert: string;
}

/**
 * Assertions to test for Line Item data logic
 * @internal
 */
export const lineItemsAssertionMocks: LineItemDataAssertion[] = [
  {
    input: {
      ean13: '1',
      isGiftCard: false,
      isbn: '1',
      manufacturer: 'GE',
      name: 'Bar',
      platformId: 1,
      platformProductId: 1,
      price: 2.01,
      quantity: 7,
      sku: '123',
      title: 'A barbell',
      totalDiscount: 0,
      upc: '123',
      variantId: '1',
      variantTitle: 'A barbell',
      vendor: 'Amazon',
    },
    assert: 'ean13',
  },
  {
    input: {
      ean13: '1',
      name: 'Bar',
      platformId: 1,
      price: 2.01,
      quantity: 7,
    },
    assert: 'ean13',
  },
  {
    input: {
      isGiftCard: true,
      totalDiscount: 1.0,
      name: 'Bar',
      price: 1.2,
      quantity: 1,
    },
    assert: 'isGiftCard',
  },
];

testSdkModelConversion({
  conversionFunction: toLineItem,
  mocks: lineItemsAssertionMocks,
  targetModel: 'LineItem',
});
