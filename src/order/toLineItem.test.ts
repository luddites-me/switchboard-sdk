/* eslint-disable no-unused-expressions */
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { LineItemData, toLineItem } from './toLineItem';

export interface LineItemDataAssertion {
  input: LineItemData;
  assert: string;
}

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
    },
    assert: 'isGiftCard',
  },
];

describe('line item convert suite', () => {
  use(chaiAsPromised);
  lineItemsAssertionMocks.forEach((test) => {
    it(`converts CustomerData to Customer matching ${test.assert}`, () => {
      const convert = toLineItem(test.input);
      expect(convert[test.assert]).to.not.be.undefined;
    });
  });
});
