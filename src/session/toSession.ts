import { Session } from 'ns8-protect-models';
import { UAParser } from 'ua-parser-js';
const isIp = require('is-ip');

export interface SessionData {
  acceptLanguage?: string;
  ip?: string;
  screenHeight?: string | number;
  screenWidth?: string | number;
  userAgent?: string;
}

export const toSession = (data: SessionData): Session => {
  const { acceptLanguage, ip, screenHeight, screenWidth, userAgent } = data;
  if (!isIp(ip)) {
    throw new Error(`${ip} is not a valid IP Address, and IP Address is required.`);
  }
  const ua = new UAParser(userAgent);
  if (!ua.getUA()) {
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
