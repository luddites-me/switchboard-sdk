/* eslint-disable
  no-unused-expressions,
  sonarjs/no-duplicate-string,
*/
import { expect } from 'chai';
import 'mocha';
import { testSdkModelConversion } from '@ns8/protect-tools-js';

import { OrderData, toOrder } from './toOrder';
import { AddressDataAssertion, addressAssertionMocks } from '../contact/toAddress.test';
import { CustomerDataAssertion, customerAssertionMocks } from '../customer/toCustomer.test';
import { SessionDataAssertion, sessionAssertionMocks } from '../session/toSession.test';
import { LineItemDataAssertion, lineItemsAssertionMocks } from './toLineItem.test';
import { TransactionDataAssertion, transactionAssertionMocks } from '../transaction/toTransaction.test';
import { orderMocks } from './orderMocks';

/**
 * Describes how Order conversion data sets should look for test assertions
 * @internal
 */
export interface OrderDataAssertion {
  input: OrderData;
  assert: string;
}

const addresses = addressAssertionMocks.map((mock: AddressDataAssertion) => mock.input);
const customer = customerAssertionMocks.map((mock: CustomerDataAssertion) => mock.input)[0];
const session = sessionAssertionMocks.map((mock: SessionDataAssertion) => mock.input)[0];
const lineItems = lineItemsAssertionMocks.map((mock: LineItemDataAssertion) => mock.input);
const transactions = transactionAssertionMocks.map((mock: TransactionDataAssertion) => mock.input);

/**
 * Assertions to test for Order Conversion data logic
 * @internal
 */
export const orderAssertionMocks: OrderDataAssertion[] = [
  {
    input: {
      addresses,
      createdAt: '01/01/1979',
      currency: 'USD',
      customer,
      hasGiftCard: false,
      lineItems,
      merchantId: '1',
      name: 'My order',
      platformCreatedAt: '01/01/1979',
      platformId: 1,
      session,
      totalPrice: '1.0',
      transactions,
      updatedAt: '01/01/1979',
    },
    assert: 'name',
  },
  {
    input: {
      name: 'My Order',
      updatedAt: '01/01/1979',
      currency: 'USD',
      merchantId: 1,
      totalPrice: 1.23,
      platformId: 1,
    },
    assert: 'updatedAt',
  },
  {
    input: {
      name: 'My order',
      platformCreatedAt: '01/01/1979',
      currency: 'USD',
      merchantId: 1,
      totalPrice: 1.23,
      platformId: 1,
      platformStatus: 'review',
      status: 'approved',
    },
    assert: 'name',
  },
  {
    input: {
      platformCreatedAt: '01/01/1979',
      currency: 'USD',
      merchantId: 1,
      totalPrice: 1.23,
      platformId: 1,
      platformStatus: 'review',
      status: 'approved',
    },
    assert: 'platformId',
  },
];

testSdkModelConversion({
  conversionFunction: toOrder,
  mocks: orderAssertionMocks,
  targetModel: 'Order',
});

describe('Order casting and conversion suite', () => {
  orderMocks.forEach((mock) => {
    it('should not throw when the data is cast', () => {
      expect(() => {
        toOrder((mock as unknown) as OrderData);
      }).not.to.throw();
    });
  });
});
