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
  /**
   * Max length: 13
   */
  ean13?: string;
  /**
   * Max length: 13
   */
  isbn?: string;
  isGiftCard?: string | number | boolean;
  /**
   * Max length: 100
   */
  manufacturer?: string;
  /**
   * Required. Max Length: 200
   */
  name: string;
  /**
   * This is the unique identifer for the Line Item on the platform.
   * Max Length: 100
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
  /**
   * Max length: 100
   */
  sku?: string;
  /**
   * Max length: 200
   */
  title?: string;
  totalDiscount?: string | number;
  /**
   * Max length: 13
   */
  upc?: string;
  /**
   * Max length: 100
   */
  variantId?: string | number;
  /**
   * Max length: 100
   */
  variantTitle?: string;
  /**
   * Max length: 100
   */
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
  const lineItem = new LineItem({ name: name.substr(0, 200) });
  if (ean13) {
    lineItem.ean13 = ean13.substr(0, 13);
  }
  if (isbn) {
    lineItem.isbn = isbn.substr(0, 13);
  }
  if (isGiftCard) {
    lineItem.isGiftCard = !!isGiftCard;
  }
  if (manufacturer) {
    lineItem.manufacturer = manufacturer.substr(0, 100);
  }
  if (platformId) {
    lineItem.platformId = `${platformId}`.substr(0, 100);
  }
  if (platformProductId) {
    lineItem.platformProductId = `${platformProductId}`.substr(0, 100);
  }
  lineItem.price = +price;
  lineItem.quantity = +quantity;
  if (sku) {
    lineItem.sku = sku.substr(0, 13);
  }
  if (title) {
    lineItem.title = title.substr(0, 199);
  }
  if (totalDiscount) {
    lineItem.totalDiscount = +totalDiscount;
  }
  if (upc) {
    lineItem.upc = upc.substr(0, 13);
  }
  if (variantId) {
    lineItem.variantId = `${variantId}`.substr(0, 100);
  }
  if (variantTitle) {
    lineItem.variantTitle = variantTitle.substr(0, 100);
  }
  if (vendor) {
    lineItem.vendor = vendor.substr(0, 100);
  }
  return lineItem;
};
