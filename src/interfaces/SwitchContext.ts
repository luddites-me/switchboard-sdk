import { ServiceIntegration, ActorType } from '..';
import { URL, URLSearchParams } from 'url';
import { DataType } from './DataType';
import { S3Location } from './S3Location';
import { Merchant } from '../models/Merchant';

export class SwitchContext {
  public readonly apiBaseUrl!: URL;
  public readonly merchant!: Merchant;
  public type!: DataType;
  public s3Location?: S3Location;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public data?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public query?: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public extension?: any;
  public actorType?: ActorType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public stepFunctionData?: any;

  public constructor(context: Partial<SwitchContext>) {
    Object.assign(this, context || {});
  }

  public createWebhookUrl(action: string): URL {
    const webhook: URL = new URL(this.data.executorEndpoint, this.apiBaseUrl);
    const queryParams: URLSearchParams = new URLSearchParams({
      action,
      authorization: this.merchant.accessTokens[0].id,
    });
    webhook.search = queryParams.toString();
    return webhook;
  }

  public createTrackingUrl(): URL {
    const url: URL = new URL(this.data.trackingEndpoint, this.apiBaseUrl);
    const queryParams: URLSearchParams = new URLSearchParams({
      authorization: this.merchant.accessTokens[0].id,
    });
    url.search = queryParams.toString();
    return url;
  }

  public getIntegrationAccessToken(type: string): string {
    return this.merchant.serviceIntegrations?.find((integration: ServiceIntegration) => integration.type === type)?.token || '';
  }
}
