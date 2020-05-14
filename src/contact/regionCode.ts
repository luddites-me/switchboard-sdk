import iso31662 from 'iso-3166/2.json';

/**
 * Retrieves a region code from a region name, e.g. inputs of 'US' and 'North Carolina' would return 'NC'.
 * @param countryCode - country code to lookup with region name
 * @param regionName - name of the region to lookup its region code
 * @public
 */
export const getRegionCodeFromRegionName = (countryCode = '', regionName = ''): string => {
  if (!countryCode || !regionName) {
    return '';
  }

  const region = iso31662.find((entry) => entry.parent === countryCode && entry.name === regionName);
  if (!region) {
    return '';
  }

  // The full code is defined as {countryCode}-{regionCode} - just want the regionCode portion
  const regionCode = region.code.replace(`${countryCode}-`, '');
  return regionCode.substr(0, 6);
};

/**
 * Returns true if the region code is found in the ISO 3166-2 entries, false otherwise.
 * @param countryCode - country code for the region
 * @param regionCode - region code to check
 * @public
 */
export const isRegionCodeValid = (countryCode = '', regionCode = ''): boolean => {
  if (!countryCode || !regionCode) {
    return false;
  }

  const fullCode = `${countryCode}-${regionCode}`;
  return !!iso31662.find((entry) => entry.code === fullCode);
};
