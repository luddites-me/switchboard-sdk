/**
 * Request object for POST to `/platform/install`.
 * storeUrl is required, all other fields are strong encouraged.
 */
export interface PlatformInstallRequest {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  storeUrl: string;
  identitySecret: string;
  moduleVersion: string|undefined;
  platformVersion: string|undefined;
  sdkVersion: string|undefined;
}
