import { getName } from 'country-list';

/**
 * Safely converts a country code (e.g. 'US') to a country (e.g. 'United States')
 * @param countryCode - a country code to parse
 * @returns string
 */
export const getCountryNameFromCountryCode = (countryCode = ''): string => {
  if (!countryCode) return '';
  return getName(countryCode) || '';
};
