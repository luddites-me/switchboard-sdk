import { Order } from 'ns8-protect-models';
import { toDate } from '../util';
import { AddressData, toAddress } from '../contact/toAddress';
import { TransactionData, toTransaction } from '../transaction/toTransaction';
import { CustomerData, toCustomer } from '../customer/toCustomer';
import { SessionData, toSession } from '../session/toSession';
import { LineItemData, toLineItem } from './toLineItem';

export interface OrderData {
  addresses?: AddressData[];
  createdAt?: string | Date;
  currency?: string;
  customer?: CustomerData;
  hasGiftCard?: string | boolean;
  lineItems?: LineItemData[];
  merchantId?: string;
  name: string;
  platformCreatedAt?: string | Date;
  platformId?: string | number;
  session?: SessionData;
  totalPrice?: string | number;
  transactions?: TransactionData[];
  updatedAt?: string | Date;
}

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
    session,
    totalPrice,
    transactions,
    updatedAt,
  } = orderData;

  const order = new Order({ name, merchantId });
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
  if (currency) {
    order.currency = currency;
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
  const platformCreatedAtDate = toDate(platformCreatedAt);
  if (platformCreatedAtDate) {
    order.platformCreatedAt = platformCreatedAtDate;
  }
  if (platformId) {
    order.platformId = platformId.toString();
  }
  if (totalPrice) {
    order.totalPrice = +totalPrice;
  }
  if (session) {
    order.session = toSession(session);
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
