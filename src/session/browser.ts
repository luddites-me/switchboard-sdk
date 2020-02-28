import { Session } from 'ns8-protect-models';
import { SwitchContext } from 'ns8-switchboard-interfaces';
import { UAParser } from 'ua-parser-js';

const isIp = require('is-ip');

/**
 * Validates properties on the Session object using the SwitchContext
 *
 * @param context - A switchboard context object
 * @param session - An optional Session object, if one already exists
 * @throws Error if either IP Address or User Agent string is undefined or invalid
 * @returns validated session object
 */
export const validateSessionProperties = (context: SwitchContext, session?: Session): Session => {
  const ret = session || new Session(context.data?.session);
  ret.screenHeight = ret.screenHeight || parseInt(context.data?.session?.screenHeight, 10);
  ret.screenWidth = ret.screenWidth || parseInt(context.data?.session?.screenWidth, 10);
  ret.ip = ret.ip || context.data?.session?.ip;
  if (!isIp(ret.ip)) {
    throw new Error(`${ret.ip} is not a valid IP Address, and IP Address is required.`);
  }
  ret.userAgent = ret.userAgent || context.data?.session?.userAgent;
  const ua = new UAParser(ret.userAgent);
  if (!ua.getUA()) {
    throw new Error(`${ret.userAgent} is not a valid User Agent string, and a UA string is required.`);
  }
  return ret;
};
