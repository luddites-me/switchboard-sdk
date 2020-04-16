import { Order } from 'ns8-protect-models';
import { toDate } from '../util';
import { AddressData, toAddress } from '../contact/toAddress';
import { TransactionData, toTransaction } from '../transaction/toTransaction';
import { CustomerData, toCustomer } from '../customer/toCustomer';
import { SessionData, toSession } from '../session/toSession';
import { LineItemData, toLineItem } from './toLineItem';
import { stringToProtectStatus } from './toOrderStatus';

/**
 * Generic object representing an order.
 * All properties are optional unless otherwise documented.
 * Not all Orders will have all of this data.
 */
export interface OrderData {
  /**
   * Required for Order Create, optional for Update.
   */
  addresses?: AddressData[];
  createdAt?: string | Date;
  /**
   * Required. Should be the type of currency,
   * such as USD, EUR, JPY, GBP, etc.
   */
  currency: string;
  /**
   * Required for Order Create, optional for Update.
   */
  customer?: CustomerData;
  hasGiftCard?: string | boolean;
  /**
   * * Required for Order Create, optional for Update.
   */
  lineItems?: LineItemData[];
  /**
   * Required.
   */
  merchantId: string | number;
  /**
   * Required.
   */
  name?: string;
  platformCreatedAt?: string | Date;
  /**
   * Required. This should be the platform's Order Id:
   *  the unique Id that identifies an order.
   */
  platformId: string | number;
  /**
   * The current order status/state on the platform.
   */
  platformStatus?: string;
  /**
   * Required for Order Create, optional for Update.
   */
  session?: SessionData;
  /**
   * Should be convertable to a Status:
   *  Approved, Merchant Review, Cancelled (case-insensitive)
   * Converter will attempt to loosely parse the passed string,
   *  if an exact match cannot be found.
   * @default 'Merchant Review'
   */
  status?: string;
  /**
   * Required.
   */
  totalPrice: string | number;
  /**
   * Required for Order Create, optional for Update.
   */
  transactions?: TransactionData[];
  updatedAt?: string | Date;
}

/**
 * Converts a generic object representing an order into a Protect model
 * @param orderData - object to convert
 */
/* eslint-disable-next-line complexity */
export const toOrder = (orderData: OrderData): Order => {
  const {
    addresses,
    createdAt,
    currency,
    customer,
    hasGiftCard,
    lineItems,
    merchantId,
    name,
    platformCreatedAt,
    platformId,
    platformStatus,
    session,
    status,
    totalPrice,
    transactions,
    updatedAt,
  } = orderData;

  const orderName = `${name || platformId}`;
  const order = new Order({ name: orderName, currency });
  if (addresses) {
    order.addresses = [];
    addresses.forEach((address) => {
      order.addresses.push(toAddress(address));
    });
  }
  const createdAtDate = toDate(createdAt);
  if (createdAtDate) {
    order.createdAt = createdAtDate;
  }
  if (customer) {
    order.customer = toCustomer(customer);
  }
  order.hasGiftCard = !!hasGiftCard;
  if (lineItems) {
    order.lineItems = [];
    lineItems.forEach((lineItem) => {
      order.lineItems.push(toLineItem(lineItem));
    });
  }
  order.merchantId = `${merchantId}`;
  const platformCreatedAtDate = toDate(platformCreatedAt);
  if (platformCreatedAtDate) {
    order.platformCreatedAt = platformCreatedAtDate;
  }
  order.platformId = `${platformId}`;
  if (platformStatus) {
    order.platformStatus = platformStatus;
  }
  order.totalPrice = +totalPrice;
  if (session) {
    order.session = toSession(session);
  }
  if (status) {
    order.status = stringToProtectStatus(status);
  }
  if (transactions) {
    order.transactions = [];
    transactions.forEach((transaction) => {
      order.transactions.push(toTransaction(transaction));
    });
  }
  const updateAtDate = toDate(updatedAt);
  if (updateAtDate) {
    order.updatedAt = updateAtDate;
  }

  return order;
};
