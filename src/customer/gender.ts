import { Gender } from '../enums/Gender';

/**
 * Converts an integer into a gender
 * @param g - 1: male; 2: female
 * @returns M (male); F (female); U (unknown)
 */
export const getGender = (g = 0): string => {
  switch (g) {
    case 1:
      return Gender.MALE;
    case 2:
      return Gender.FEMALE;
    default:
      return Gender.UNKNOWN;
  }
};
