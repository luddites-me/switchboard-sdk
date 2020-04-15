/* eslint-disable
  sonarjs/cognitive-complexity,
*/
import { LineItem } from 'ns8-protect-models';

/**
 * Generic object representing a line item:
 *  the items a customer has ordered.
 * All properties are optional unless otherwise documented.
 * Not all orders will have Line Items with all of this data.
 */
export interface LineItemData {
  ean13?: string;
  isbn?: string;
  isGiftCard?: string | number | boolean;
  manufacturer?: string;
  /**
   * Required.
   */
  name: string;
  /**
   * This is the unique identifer for the Line Item on the platform.
   */
  platformId?: string | number;
  platformProductId?: string | number;
  /**
   * Required.
   */
  price: string | number;
  /**
   * Required.
   */
  quantity: string | number;
  sku?: string;
  title?: string;
  totalDiscount?: string | number;
  upc?: string;
  variantId?: string | number;
  variantTitle?: string;
  vendor?: string;
}

/**
 * Converts a generic object representing a line item into a Protect model
 * @param data - object to transform
 */
/* eslint-disable-next-line complexity */
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
  const lineItem = new LineItem({ name });
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
  if (platformId) {
    lineItem.platformId = `${platformId}`;
  }
  if (platformProductId) {
    lineItem.platformProductId = `${platformProductId}`;
  }
  lineItem.price = +price;
  lineItem.quantity = +quantity;
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
