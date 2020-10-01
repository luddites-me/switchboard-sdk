/**
 * Response object from the `/platform/install`.
 * Contains an accessToken for authenticating with Protect
 * and a queueId for interacting with SQS
 */
export interface PlatformInstallResponse {
  accessToken: string;
  queueId: string;
}
