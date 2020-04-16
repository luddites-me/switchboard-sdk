import { Contact, Merchant } from 'ns8-protect-models';

/**
 * Generic object that can be converted to a Protect Contact
 */
export interface ContactData {
  /**
   * Max length: 255
   */
  email?: string;
  /**
   * Max length: 50
   */
  firstName?: string;
  /**
   * Max length: 50
   */
  lastName?: string;
  /**
   * Max length: 255
   */
  name?: string;
  /**
   * Max length: 16
   */
  phone?: string;
}

/**
 * Generic object that can be converted to a Protect Merchant
 */
export interface MerchantData {
  contact?: ContactData;
  /**
   * Max length: 255
   */
  name?: string;
  storeFrontUrl?: string;
}

/**
 * Converts a generic object representing a merchant into a Protect model
 * @param data - generic data structure representing a merchant
 */
/* eslint-disable-next-line complexity */
export const toMerchant = (data: MerchantData): Merchant => {
  const { name, contact, storeFrontUrl } = data;
  const merchant = new Merchant();
  if (name) {
    merchant.name = name.substr(0, 255);
  }
  if (storeFrontUrl) {
    merchant.storefrontUrl = storeFrontUrl;
  }
  if (contact) {
    const merchantContact = new Contact();
    let any = false;
    if (contact.email) {
      merchantContact.email = contact.email.substr(0, 255);
      any = true;
    }
    if (contact.firstName) {
      merchantContact.firstName = contact.firstName.substr(0, 50);
      any = true;
    }
    if (contact.lastName) {
      merchantContact.lastName = contact.lastName.substr(0, 50);
      any = true;
    }
    if (contact.name) {
      merchantContact.name = contact.name.substr(0, 255);
      any = true;
    }
    if (contact.phone) {
      merchantContact.phone = contact.phone.substr(0, 16);
      any = true;
    }
    if (any) {
      merchant.contact = merchantContact;
    }
  }
  return merchant;
};
