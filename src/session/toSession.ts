/* eslint-disable */
import { Session } from 'ns8-protect-models';
import { UAParser } from 'ua-parser-js';

const isIp = require('is-ip');

/**
 * Generic object representing a session.
 * @remarks
 * All properties are optional unless otherwise documented.
 * Not all sessions will have all of this data.
 * @public
 */
export interface SessionData {
  acceptLanguage?: string;
  /**
   * Required. IP Address is required for tracking
   */
  ip: string;
  screenHeight?: string | number;
  screenWidth?: string | number;
  /**
   * Required. User Agent is required for tracking
   */
  userAgent: string;
}

/**
 * Converts a generic object representing a session into a Protect model
 * @throws if IP Address or User Agent is invalid
 * @param data - object to convert
 * @public
 */
export const toSession = (data: SessionData): Session => {
  const { acceptLanguage, ip, screenHeight, screenWidth, userAgent } = data;
  if (!ip || !isIp(ip)) {
    throw new Error(`${ip} is not a valid IP Address, and IP Address is required.`);
  }
  const ua = new UAParser(userAgent);
  if (!userAgent || !ua.getUA()) {
    throw new Error(`${userAgent} is not a valid User Agent string, and a UA string is required.`);
  }

  const session = new Session({ ip, userAgent });
  if (acceptLanguage) {
    session.acceptLanguage = acceptLanguage;
  }
  if (screenHeight) {
    session.screenHeight = +screenHeight;
  }
  if (screenWidth) {
    session.screenWidth = +screenWidth;
  }
  return session;
};
