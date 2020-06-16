/* eslint-disable */
import { Order } from 'ns8-protect-models';
import { toDate } from '../util';
import { AddressData, toAddress } from '../contact/toAddress';
import { TransactionData, toTransaction } from '../transaction/toTransaction';
import { CustomerData, toCustomer } from '../customer/toCustomer';
import { SessionData, toSession } from '../session/toSession';
import { LineItemData, toLineItem } from './toLineItem';
import { stringToProtectStatus } from './toOrderStatus';
import { getLogger } from '../logger';

const logger = getLogger();

/**
 * Generic object representing an order.
 * @remarks
 * All properties are optional unless otherwise documented.
 * Not all Orders will have all of this data.
 * @public
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
   * Max Length: 3
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
   * Required. Max Length: 100
   */
  name?: string;
  platformCreatedAt?: string | Date;
  /**
   * Required. This should be the platform's Order Id:
   *  the unique Id that identifies an order.
   * Max Length: 100
   */
  platformId: string | number;
  /**
   * The current order status/state on the platform.
   * Max Length: 255
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
 * @public
 */
export const toOrder = async (orderData: OrderData): Promise<Order> => {
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

  const orderName = `${name || platformId}`.substr(0, 100);
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
  order.platformId = `${platformId}`.substr(0, 100);
  if (platformStatus) {
    order.platformStatus = platformStatus.substr(0, 255);
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

  const errors = await order.getValidationErrors();
  if (errors.length > 0) {
    const message: string[] = [];
    errors.forEach(e => {
      message.push(e.toString());
    })
    logger.warn('Order validation failed', errors);
    throw new Error(`Order validation failed: ${message.join('\r\n')}`);
  }
  return order;
};
