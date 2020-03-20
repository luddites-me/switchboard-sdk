import { Contact, Merchant } from 'ns8-protect-models';

/**
 * Generic object that can be converted to a Protect Contact
 */
export interface ContactData {
  email?: string;
  firstName?: string;
  lastName?: string;
  name?: string;
  phone?: string;
}

/**
 * Generic object that can be converted to a Protect Merchant
 */
export interface MerchantData {
  contact?: ContactData;
  name?: string;
  storeFrontUrl?: string;
}

/**
 * Converts a generic object representing a merchant into a Protect model
 * @param data - generic data structure representing a merchant
 */
export const toMerchant = (data: MerchantData): Merchant => {
  const { name, contact, storeFrontUrl } = data;
  const merchant = new Merchant();
  if (name) {
    merchant.name = name;
  }
  if (storeFrontUrl) {
    merchant.storefrontUrl = storeFrontUrl;
  }
  if (contact) {
    const merchantContact = new Contact();
    let any = false;
    if (contact.email) {
      merchantContact.email = contact.email;
      any = true;
    }
    if (contact.firstName) {
      merchantContact.firstName = contact.firstName;
      any = true;
    }
    if (contact.lastName) {
      merchantContact.lastName = contact.lastName;
      any = true;
    }
    if (contact.name) {
      merchantContact.name = contact.name;
      any = true;
    }
    if (contact.phone) {
      merchantContact.phone = contact.phone;
      any = true;
    }
    if (any) {
      merchant.contact = merchantContact;
    }
  }
  return merchant;
};
