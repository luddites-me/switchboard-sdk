/**
 * Determines whether a value exists on an enum
 * @param enm - An object representing an enum
 * @param key - a key to find within the enum
 * @param caseInsensitive - option to perform a case insensitive match default false,
 * @returns true if a match is found
 * @public
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const existsInEnum = (enm: object, key: string, caseInsensitive = false): boolean => {
  if (caseInsensitive) {
    return Object.values(enm).some((v) => v.toString().toLowerCase().trim() === key.toLowerCase().trim());
  }
  return Object.values(enm).some((v) => v === key);
};
