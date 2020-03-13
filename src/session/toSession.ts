import { Session } from 'ns8-protect-models';

export interface SessionData {
  acceptLanguage?: string;
  ip?: string;
  screenHeight?: string | number;
  screenWidth?: string | number;
  userAgent?: string;
}

export const toSession = (data: SessionData): Session => {
  const { acceptLanguage, ip, screenHeight, screenWidth, userAgent } = data;
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
