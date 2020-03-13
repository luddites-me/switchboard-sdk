import { Address } from 'ns8-protect-models';
import { getCountryNameFromCountryCode, stringToProtectAddressType } from '.';

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
  type?: string;
  zip?: string | number;
}

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
    address.country = country;
  }
  if (countryCode) {
    address.countryCode = getCountryNameFromCountryCode(countryCode);
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
