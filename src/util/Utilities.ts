import { Logger } from './Logger';
import { getName } from 'country-list';
/**
 * Generic utility functions
 */
export class Utilities {

  /**
   * Safely converts a string to a Date
   */
  public static toDate = (date: string | undefined): Date | undefined => {
    let ret: Date | undefined;
    if (date) {
      try {
        ret = new Date(date);
      } catch (e) {
        Logger.log(`Failed to convert ${date} to a Date`, e);
      }
    }
    return ret;
  }

  /**
   * Mechanism for synchronous wait.
   * Usage: `await this.sleep(5000)`
   */
  public static sleep = async (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Safely converts a country code (e.g. 'US') to a country (e.g. 'United States')
   */
  public static getCountryNameFromCountryCode = (code: string): string => {
    if (!code) return '';
    return getName(code);
  }
}