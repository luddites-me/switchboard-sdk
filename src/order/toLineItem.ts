/* eslint-disable
  sonarjs/cognitive-complexity,
*/
import { LineItem } from 'ns8-protect-models';

export interface LineItemData {
  ean13?: string;
  isbn?: string;
  isGiftCard?: string | number | boolean;
  manufacturer?: string;
  name?: string;
  platformId?: string | number;
  platformProductId?: string | number;
  price?: string | number;
  quantity?: string | number;
  sku?: string;
  title?: string;
  totalDiscount?: string | number;
  upc?: string;
  variantId?: string | number;
  variantTitle?: string;
  vendor?: string;
}

export const toLineItem = (data: LineItemData): LineItem => {
  const {
    ean13,
    isbn,
    isGiftCard,
    manufacturer,
    name,
    platformId,
    platformProductId,
    price,
    quantity,
    sku,
    title,
    totalDiscount,
    upc,
    variantId,
    variantTitle,
    vendor,
  } = data;
  const lineItem = new LineItem();
  if (ean13) {
    lineItem.ean13 = ean13;
  }
  if (isbn) {
    lineItem.isbn = isbn;
  }
  if (isGiftCard) {
    lineItem.isGiftCard = !!isGiftCard;
  }
  if (manufacturer) {
    lineItem.manufacturer = manufacturer;
  }
  if (name) {
    lineItem.name = name;
  }
  if (platformId) {
    lineItem.platformId = `${platformId}`;
  }
  if (platformProductId) {
    lineItem.platformProductId = `${platformProductId}`;
  }
  if (price) {
    lineItem.price = +price;
  }
  if (quantity) {
    lineItem.quantity = +quantity;
  }
  if (sku) {
    lineItem.sku = sku;
  }
  if (title) {
    lineItem.title = title;
  }
  if (totalDiscount) {
    lineItem.totalDiscount = +totalDiscount;
  }
  if (upc) {
    lineItem.upc = upc;
  }
  if (variantId) {
    lineItem.variantId = `${variantId}`;
  }
  if (variantTitle) {
    lineItem.variantTitle = variantTitle;
  }
  if (vendor) {
    lineItem.vendor = vendor;
  }
  return lineItem;
};
