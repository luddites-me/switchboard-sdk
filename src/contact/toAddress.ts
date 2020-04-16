import { Address } from 'ns8-protect-models';
import { getCountryCodeFromCountryName, getCountryNameFromCountryCode, stringToProtectAddressType } from '.';

/**
 * Generic object representing data that can be converted to an Address.
 * All properties are optional unless otherwise documented.
 */
export interface AddressData {
  address1?: string;
  address2?: string;
  city?: string;
  company?: string;
  country?: string;
  countryCode?: string;
  latitude?: string | number;
  longitude?: string | number;
  name?: string;
  region?: string;
  regionCode?: string;
  /**
   * Required. Should be convertable to an AddressType:
   *  Billing, Shipping, Device (case-insensitive)
   * Converter will attempt to loosely parse the passed string,
   * if an exact match cannot be found.
   * @default 'Device'
   */
  type: string;
  zip?: string | number;
}

/**
 * Safely converts a generic object representing an address into a Protect model
 * @param data - generic object representing an address
 */
/* eslint-disable-next-line complexity, sonarjs/cognitive-complexity */
export const toAddress = (data: AddressData): Address => {
  const {
    address1,
    address2,
    city,
    company,
    country,
    countryCode,
    latitude,
    longitude,
    name,
    region,
    regionCode,
    type,
    zip,
  } = data;
  const address = new Address({
    address1,
  });
  if (address2) {
    address.address2 = address2;
  }
  if (city) {
    address.city = city;
  }
  if (company) {
    address.company = company;
  }
  if (country) {
    if (country.length === 2) {
      address.country = getCountryNameFromCountryCode(country);
    } else {
      address.country = country;
    }
  }
  if (countryCode) {
    if (countryCode.length === 2) {
      address.countryCode = countryCode;
    } else {
      address.countryCode =
        getCountryCodeFromCountryName(countryCode) || getCountryCodeFromCountryName(address.country);
    }
  }
  if (latitude) {
    address.latitude = +latitude;
  }
  if (longitude) {
    address.longitude = +longitude;
  }
  if (name) {
    address.name = name;
  } else {
    address.name = address1;
  }
  if (region) {
    address.region = region;
  }
  if (regionCode) {
    address.regionCode = regionCode;
  }
  address.type = stringToProtectAddressType(type);
  if (zip) {
    address.zip = `${zip}`;
  }
  return address;
};
