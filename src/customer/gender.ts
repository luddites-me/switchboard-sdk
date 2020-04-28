/* eslint-disable */
import { Gender } from '../enums/Gender';

/**
 * Converts an integer into a gender
 * @param g - 1: male; 2: female
 * @returns M (male); F (female); U (unknown)
 * @internal
 */
export const getGender = (g: string | number = 0): string => {
  switch (g?.toString().toLowerCase()) {
    case 'm':
    case 'male':
    case '1':
      return Gender.MALE;
    case 'f':
    case 'female':
    case '2':
      return Gender.FEMALE;
    default:
      return Gender.UNKNOWN;
  }
};
