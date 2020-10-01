/* eslint-disable
  no-unused-expressions,
  sonarjs/no-duplicate-string,
*/
import { SdkTestAssertionType, testSdkAssertion, testSdkModelConversion } from '@luddites-me/ts-tools';

import { OrderData, toOrder } from './toOrder';
import { AddressDataAssertion, addressAssertionMocks } from '../contact/toAddress.test';
import { CustomerDataAssertion, customerAssertionMocks } from '../customer/toCustomer.test';
import { SessionDataAssertion, sessionAssertionMocks } from '../session/toSession.test';
import { LineItemDataAssertion, lineItemsAssertionMocks } from './toLineItem.test';
import { TransactionDataAssertion, transactionAssertionMocks } from '../transaction/toTransaction.test';
import { orderMocks } from './orderMocks';
import { asyncForEach } from '../util';

/**
 * Describes how Order conversion data sets should look for test assertions
 * @public
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
 * @public
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
  conversionFunction: async (input) => toOrder(input),
  mocks: orderAssertionMocks,
  targetModel: 'Order',
});

testSdkAssertion({
  name: 'Casting Orders',
  assertions: [
    {
      assertionFunction: async () => {
        return asyncForEach(orderMocks, async (mock) => {
          return toOrder((mock as unknown) as OrderData);
        });
      },
      name: 'should not throw when the data is cast',
      assertion: SdkTestAssertionType.TO_NOT_THROW,
    },
  ],
});

const validateMock: OrderData = {
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
};

testSdkAssertion({
  name: 'Tests validation rules',
  assertions: [
    {
      name: 'ISBN is invalid',
      assertionFunction: async () => {
        const mock: OrderData = JSON.parse(JSON.stringify(validateMock));
        if (!mock.lineItems) return Promise.reject(new Error('Failed test'));
        mock.lineItems[0].isbn = '1';
        return toOrder(mock);
      },
      assertion: SdkTestAssertionType.TO_THROW,
    },
    {
      name: 'IP Address is invalid',
      assertionFunction: async () => {
        const mock: OrderData = JSON.parse(JSON.stringify(validateMock));
        if (!mock.session) return Promise.reject(new Error('Failed test'));
        mock.session.ip = 'x!2';
        return toOrder(mock);
      },
      assertion: SdkTestAssertionType.TO_THROW,
    },
    {
      name: 'User Agent is invalid',
      assertionFunction: async () => {
        const mock: OrderData = JSON.parse(JSON.stringify(validateMock));
        if (!mock.session) return Promise.reject(new Error('Failed test'));
        mock.session.userAgent = '';
        return toOrder(mock);
      },
      assertion: SdkTestAssertionType.TO_THROW,
    },
  ],
});
