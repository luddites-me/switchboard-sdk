import { Gender } from '../enums/Gender';

/**
 *
 * @param g - Converts an integer between 0-2 into a gender
 * @returns M (male); F (female); U (unknown)
 */
export const getGender = (g = 0): string => {
  switch (g) {
    case 0:
      return Gender.UNKNOWN;
    case 1:
      return Gender.MALE;
    case 2:
      return Gender.FEMALE;
    default:
      return Gender.UNKNOWN;
  }
};
