import { RiskFactorCategory } from '../fraud-assessment/RiskFactorCategory';
import { RiskFactorType } from '../fraud-assessment/RiskFactorType';
import { TextKey } from './TextKey';

// tslint:disable:max-line-length
export class TextProvider {

  public static getRiskFactorDescription = (type: RiskFactorType, category: RiskFactorCategory): string => {
    const categoryDesc = TextProvider.RISK_FACTOR_CATEGORY.get(category);
    const ret = TextProvider.RISK_FACTORS.get(type);
    return ret ? ret(categoryDesc || '') : '';
  };

  public static getText = (key: TextKey, ...parameters: string[]): string => {
    const ret = TextProvider.DESCRIPTIONS.get(key);
    return ret ? ret(parameters) : '';
  };

  private static DESCRIPTIONS: Map<TextKey, (parameters: string[]) => string > = new Map([
    [TextKey.CUST_VER_SMS_BODY, (params: string[]): string => `Your ${params[0]} confirmation code is ${params[1]}`],
    [TextKey.MONITOR_STATUS_OK, (): string => 'OK'],
    [TextKey.MONITOR_STATUS_NOT_RUN, (): string => 'Not yet tested'],
    [TextKey.BILLING_PRODUCT_NAME, (): string => 'LUDDITES Protect'],
    [TextKey.BILLING_TERMS, (): string => 'The Basic plan includes up to 30,000 scores (page views + orders) each month. There will an overage charge of $1 for every 1,000 scores you use above 30,000'],
    [TextKey.MONITOR_STATUS_ERROR, (message?: any): string => message || 'Error'],
  ]);

  private static RISK_FACTORS: Map<RiskFactorType, (param: string) => string > = new Map([
    [RiskFactorType.NONE, (): string => 'No issues found'],
    [RiskFactorType.COUNTRY_HIGH_RISK, (): string => 'Transaction originated from a high-risk country'],
    [RiskFactorType.COUNTRY_IIN_MATCH, (param: string): string => `${param} address does not match the country of the majority of customers using that bank identification number`],
    [RiskFactorType.PRE_PAID_CARD, (): string => 'The credit card is prepaid'],
    [RiskFactorType.DEVICE_UNIQUENESS, (): string => 'The device may be being used for multiple transactions'],
    [RiskFactorType.EMAIL_FREE, (): string => `The customer's email address is from a free service`],
    [RiskFactorType.EMAIL_HIGH_RISK, (): string => `The customer's email address indicates high risk`],
    [RiskFactorType.ADDRESS_HIGH_RISK, (param: string): string => `${param} address is associated with fraudulent transactions`],
    [RiskFactorType.ADDRESS_CITY_MISMATCH, (param: string): string => `${param} address has a postal code not in the city entered`],
    [RiskFactorType.ADDRESS_IP_PROXIMITY, (param: string): string => `Distance from ${param.toLowerCase()} address to the device exceeds 100km`],
    [RiskFactorType.ADDRESS_SHIPPING_PROXIMITY, (param: string): string => `Distance from shipping address to ${param.toLowerCase()} address exceeds 100km`],
    [RiskFactorType.ADDRESS_IP_COUNTRY_MISMATCH, (param: string): string => `${param} address is not in the country of the I.P. address the transaction originated from`],
    [RiskFactorType.MEDIUM_RISK_TRANSACTION, (): string => `The payment is rated as medium risk (more than a 10% chance of fraud)`],
    [RiskFactorType.HIGH_RISK_TRANSACTION, (): string => `The payment is rated as high risk (more than a 25% chance of fraud)`],
    [RiskFactorType.EXTREME_RISK_TRANSACTION, (): string => `The payment is rated as an extreme risk (more than a 50% chance of fraud)`],
    [RiskFactorType.PUBLIC_PROXY, (): string => `The user is using a public proxy`],
    [RiskFactorType.ANONYMOUS_PROXY, (): string => `The user is using an anonymous proxy`],
    [RiskFactorType.IP_HIGH_RISK, (): string => `The user is originating from a high-risk I.P. address`],
    [RiskFactorType.IP_BLOCK_LIST, (): string => `The I.P. address is listed in our database of known infected machines.  This detects machines that have been hijacked as bots and could be used to generate large amounts of automated traffic and clicks.  This database is maintained in realtime in order to detect emerging sources.`],
    [RiskFactorType.IP_COLOCATION, (): string => `This is when a user is routing their traffic through a data center or colocation facility. This can be an attempt to hide their true location. We maintain a database of data center I.P. address ranges, since many bot networks will use data centers to create or proxy traffic. A session from within, for example, an Amazon AWS data center address block is unlikely to be valid.`],
    [RiskFactorType.IP_PROXY, (): string => `The user routed traffic through a public proxy, which is similar to using a data center to proxy traffic.  This is generally an attempt to hide the origin of the user.  We maintain a realtime database of public web proxies in order to score sessions from them.`],
    [RiskFactorType.IP_TOR, (): string => `TOR is a web anonymizer, that routes traffic through various endpoints around the world.  It has legitimate uses for privacy, but hides the origin of the user, so it can be used to generate anonymous sessions and transactions.`],
    [RiskFactorType.IP_UNIVERSITY, (): string => `The user is originating from a university network.  This is a weak fraud signal, but fraud is higher from universities than the general public.`],
    [RiskFactorType.PUBLISHER_COLLUSION, (): string => `The user's I.P. address has been determined to be part of a network of bots that are engaged in committing click fraud.`],
    [RiskFactorType.FAST_CLICK, (): string => `The user has clicked on an ad faster than a human would normally be capable of`],
    [RiskFactorType.REPEAT_CLICK, (): string => `The user has repeatedly clicked to your site more than normal usage would dictate`],
    [RiskFactorType.UA_FREQUENCY, (): string => `The same user agent is appearing too frequently`],
    [RiskFactorType.IP_USER_ID_ROTATION, (): string => `An I.P. address has repeatedly visited your site, but has changed its user id cookie too frequently.  This is an indication that a user or bot is clearing its cookies in order to appear as different users.`],
    [RiskFactorType.UA_ROTATION, (): string => `An I.P. address has repeatedly visited your site, but has changed its user agent too frequently.  This is an indication that a user or bot is clearing its cookies in order to appear as different users.`],
    [RiskFactorType.AD_PROVIDER_BOT, (): string => `The user is actually a known bot from an ad network.`],
    [RiskFactorType.PUBLISHER_REPUTATION, (): string => `The session is referred from a publisher that is part of a network of sites that have been detected as having click fraud.`],
    [RiskFactorType.KEYWORD_COLLUSION, (): string => `The same keyword has appeared in search referrals too frequently within a publisher network.`],
    [RiskFactorType.UA_KNOWN_BOT, (): string => `The user is actually a bot with a user agent that matches our database of known bots.`],
    [RiskFactorType.UA_SPOOFED, (): string => `The user is spoofing a client device that is it not actually on.  Bots often rotate their user agents in order to appear to be more than one device and generate realistic looking traffic.  We have developed technology to match the user agent to the browser's capabilities and detect sessions that have altered their user agent.`],
    [RiskFactorType.VISIBILITY, (): string => `The user's session never became visible on the screen.  This can be legitimate for a session, but any transactions should be considered suspect.`],
    [RiskFactorType.COOKIE_ROTATION, (): string => `Cookies have been frequently changed to mimic multiple users.`],
    [RiskFactorType.CLICK_COUNT, (): string => `Too many clicks from the same I.P. address.`],
    [RiskFactorType.SEARCH_ENGINE_INVALID, (): string => `The user came from a search engine that either does not exist, has ceased to exist, or is known to generate fake referrals.`],
    [RiskFactorType.HIDDEN, (): string => `The user's session never became visible on the screen.  This can be legitimate for a session, but any transactions should be considered suspect.`],
    [RiskFactorType.REFERRER_BLACKLISTED, (): string => `The user came from a referrer that either does not exist, has ceased to exist, or is known to generate fake referrals.`],
    [RiskFactorType.IP_KNOWN_MALWARE, (): string => `The user's I.P. address is in a database of bots engaging in phishing, click fraud, transaction fraud, denial of service attacks or other malicious activity.`],

    [RiskFactorType.PHONE_INVALID, (param: string): string => `${param} address phone number is not valid.`],
    [RiskFactorType.PHONE_DISCONNECTED, (param: string): string => `${param} address phone number is not connected.`],
    [RiskFactorType.PHONE_RESIDENT_MISMATCH, (param: string): string => `${param} address phone number does not match resident's name.`],
    [RiskFactorType.PHONE_ADDRESS_MISMATCH, (param: string): string => `${param} address phone number does not match actual address.`],
    [RiskFactorType.PHONE_SUBSCRIBER_DECEASED, (param: string): string => `${param} address phone subscriber is listed as deceased.`],
    [RiskFactorType.PHONE_PREPAID, (param: string): string => `${param} address phone is prepaid.`],
    [RiskFactorType.PHONE_NONFIXED_VOIP, (param: string): string => `${param} address phone is a non-fixed VOIP, which is a fraud indicator.`],

    [RiskFactorType.ADDRESS_INVALID, (param: string): string => `${param} address is not valid.`],
    [RiskFactorType.ADDRESS_INACTIVE, (param: string): string => `${param} address is not accepting mail.`],
    [RiskFactorType.ADDRESS_RESIDENT_MISMATCH, (param: string): string => `${param} address does not match resident's name.`],
    [RiskFactorType.ADDRESS_RESIDENT_DECEASED, (param: string): string => `${param} address resident is listed as deceased.`],
    [RiskFactorType.ADDRESS_FORWARDER, (param: string): string => `${param} address is a freight forwarding or reshipping service, which is generally used to ship goods out of the country.`],

    [RiskFactorType.EMAIL_INVALID, (): string => `Email address is not valid.`],
    [RiskFactorType.EMAIL_AUTO_GENERATED, (): string => `Email address was autogenerated.`],
    [RiskFactorType.EMAIL_DISPOSABLE, (): string => `Email address is disposable.  This is a strong fraud indicator.`],
    [RiskFactorType.EMAIL_NAME_MISMATCH, (): string => `The email address is not the same as the registered name.`],
    [RiskFactorType.IP_INVALID, (): string => `The I.P. address for the user is not valid.`],
  ]);

  private static RISK_FACTOR_CATEGORY: Map<RiskFactorCategory, string> = new Map([
    [RiskFactorCategory.DEFAULT, 'Default'],
    [RiskFactorCategory.BILLING, 'Billing'],
    [RiskFactorCategory.EMAIL, 'Email'],
    [RiskFactorCategory.IP, 'IP'],
    [RiskFactorCategory.PAYMENT, 'Payment'],
    [RiskFactorCategory.SESSION, 'Session'],
    [RiskFactorCategory.SHIPPING, 'Shipping'],
    [RiskFactorCategory.BEHAVIOR, 'Behavior'],
    [RiskFactorCategory.USER_AGENT, 'User Agent'],
  ]);
}
