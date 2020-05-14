import { Address } from 'ns8-protect-models';
import {
  getCountryCodeFromCountryName,
  getCountryNameFromCountryCode,
  getRegionCodeFromRegionName,
  isRegionCodeValid,
  stringToProtectAddressType,
} from '.';

/**
 * Generic object representing data that can be converted to an Address.
 * All properties are optional unless otherwise documented.
 * @public
 */
export interface AddressData {
  /**
   * Max length: 65535
   */
  address1?: string;
  /**
   * Max length: 65535
   */
  address2?: string;
  /**
   * Max length: 100
   */
  city?: string;
  company?: string;
  /**
   * Max length: 100
   */
  country?: string;
  /**
   * Max length: 2
   */
  countryCode?: string;
  latitude?: string | number;
  longitude?: string | number;
  /**
   * Max length: 100
   */
  name?: string;
  /**
   * Max length: 100
   */
  region?: string;
  /**
   * Max length: 6
   */
  regionCode?: string;
  /**
   * Required. Should be convertable to an AddressType:
   *  Billing, Shipping, Device (case-insensitive)
   * Converter will attempt to loosely parse the passed string,
   * if an exact match cannot be found.
   */
  type: string;
  /**
   * Max length: 100
   */
  zip?: string | number;
}

/**
 * Safely converts a generic object representing an address into a Protect model
 * @param data - generic object representing an address
 * @internal
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
  const address = new Address();
  if (address1) {
    address.address1 = address1.substr(0, 65535);
  }
  if (address2) {
    address.address2 = address2.substr(0, 65535);
  }
  if (city) {
    address.city = city.substr(0, 100);
  }
  if (company) {
    address.company = company.substr(0, 200);
  }
  if (country) {
    if (country.length === 2) {
      address.country = getCountryNameFromCountryCode(country);
    } else {
      address.country = country.substr(0, 100);
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
    address.name = name.substring(0, 100);
  } else {
    address.name = address1?.substr(0, 100);
  }
  if (region) {
    address.region = region.substr(0, 100);
  }
  if (regionCode && isRegionCodeValid(countryCode, regionCode)) {
    address.regionCode = regionCode.substring(0, 6);
  } else {
    address.regionCode = getRegionCodeFromRegionName(countryCode, region);
  }
  address.type = stringToProtectAddressType(type);
  if (zip) {
    address.zip = `${zip}`.substr(0, 200);
  }
  return address;
};
