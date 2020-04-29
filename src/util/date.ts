/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from 'moment';
import { getLogger } from '../logger';

const log = getLogger();

/**
 * Determines if a date input is a valid date representation
 * @param date - a string/number/Date/array/object to validate
 * @public
 */
export const isValidDate = (date: any): boolean => {
  if (date) {
    return moment(date).isValid();
  }
  return false;
};

/**
 * Safely converts a value to a Date
 * @param date - a string/number/Date/array/object to attempt to parse
 * @public
 */
export const toDate = (date: any = undefined): Date | undefined => {
  let ret: Date | undefined;
  if (date) {
    try {
      const tryRet = moment(date);
      ret = tryRet.toDate();
    } catch (e) {
      /* istanbul ignore next */
      log.error(`Failed to convert ${date} to a Date`, e);
    }
  }
  return ret;
};
