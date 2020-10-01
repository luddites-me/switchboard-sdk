export interface OnInstallPlatformData {
  // Temporary solution for now. The proper solution is to type this as `Record<string, unknown>`,
  // but see discussion at https://github.com/microsoft/TypeScript/issues/21732 for reasons and ramifications.
  // eslint-disable-next-line @typescript-eslint/ban-types
  actions: object;
  executorEndpoint: string;
  trackingEndpoint: string;
}
