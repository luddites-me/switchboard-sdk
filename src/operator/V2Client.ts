import {
  get, put, post, patch, del, Response,
} from 'superagent';

import { URL } from 'url';
import {
  FraudAssessment, FraudAssessmentCreate, MerchantUpdate, Order, OrderUpdate,
} from '..';
import { HTTPMethod } from './HTTPMethod';
import { RequestPacket } from './RequestPacket';
import { ApiError } from './ApiError';

export class V2Client {
  private static MAX_SUCCESS_CODE = 299;

  private baseUrl!: URL;
  private authToken!: string;

  public withBaseUrl(baseUrl: URL): V2Client {
    this.baseUrl = new URL('/protect', baseUrl);
    return this;
  }

  public withAuthToken(authToken: string): V2Client {
    this.authToken = authToken;
    return this;
  }

  public async postOrder(order: Order): Promise<Order> {
    return this.request<Order>(HTTPMethod.POST, 'orders', order);
  }

  public async postFraudAssessment(
    fraudsAssessmentCreate: FraudAssessmentCreate,
    orderId: string,
  ): Promise<FraudAssessment[]> {
    const path = `orders/${orderId}/fraud-assessments`;
    return this.request<FraudAssessment[]>(HTTPMethod.POST, path, fraudsAssessmentCreate);
  }

  public async updateMerchant(merchantUpdate: MerchantUpdate): Promise<MerchantUpdate> {
    return this.request<MerchantUpdate>(HTTPMethod.PATCH, 'merchants/current', merchantUpdate);
  }

  public async uninstall(): Promise<void> {
    const method = HTTPMethod.DELETE;
    const url = `${this.baseUrl}/merchants/current`;
    const requestPacket: RequestPacket = {
      url,
      method,
      headers: {
        Authorization: `Bearer ${this.authToken}`,
      },
      body: '',
    };
    // using this.fetch() here instead of this.request<T>()
    // because request assumes JSON response body from every request
    // and uninstall "DELETE" api endpoint does not return response body
    const response: Response = await this.fetch(requestPacket);
    this.checkForErrorResponse(requestPacket, response);
  }

  public async getOrderByName(orderName: string): Promise<Order> {
    const encodedOrderName: string = encodeURIComponent(orderName);
    return this.request<Order>(HTTPMethod.GET, `orders/order-name/${encodedOrderName}`);
  }

  public async updateOrderStatus(orderId: string, orderUpdate: OrderUpdate): Promise<OrderUpdate> {
    return this.request<OrderUpdate>(HTTPMethod.PUT, `orders/${orderId}`, orderUpdate);
  }

  // Temporary solution for now. The proper solution is to type this as `Record<string, unknown>`,
  // See discussion at https://github.com/microsoft/TypeScript/issues/21732.
  // eslint-disable-next-line @typescript-eslint/ban-types
  private async request<T>(method: HTTPMethod, path: string, obj?: object): Promise<T> {
    const url = `${this.baseUrl}/${path}`;
    const requestPacket: RequestPacket = {
      url,
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`,
      },
      body: method !== HTTPMethod.GET && obj ? JSON.stringify(obj) : '',
    };
    const response: Response = await this.fetch(requestPacket);
    this.checkForErrorResponse(requestPacket, response);
    return this.safeParseJSON<T>(response);
  }

  private safeParseJSON<T>(response: Response): T {
    try {
      return JSON.parse(response.text);
    } catch (error) {
      const message = 'Operator V2Client response json parsing error:';
      const errorDetails = this.formatErrorForOutput(error);
      throw new ApiError(undefined, response, `${message} ${errorDetails}`);
    }
  }

  private async checkForErrorResponse(requestPacket: RequestPacket, response: Response): Promise<void> {
    if (this.isAwsElbBadGateway(response)) {
      throw new ApiError(requestPacket, response, 'AWS ELB 502 - Bad Gateway');
    }
    if (response.status > V2Client.MAX_SUCCESS_CODE) {
      const body = await this.safeParseJSON(response);
      throw new ApiError(requestPacket, response, body);
    }
  }

  // Temporary solution for now. The proper solution is to type this as `Record<string, unknown>`,
  // See discussion at https://github.com/microsoft/TypeScript/issues/21732.
  // eslint-disable-next-line @typescript-eslint/ban-types
  private formatErrorForOutput(error: object): string {
    try {
      return `${JSON.stringify(error, Object.getOwnPropertyNames(error), 2)}\n`;
    } catch (err) {
      return '';
    }
  }

  private isAwsElbBadGateway(response: Response): boolean {
    const awsElbLabel = 'awselb/2.0';
    const responseServer = response.header.server;
    return !response.ok && response.status === 502 && responseServer === awsElbLabel;
  }

  private async fetch(requestPacket: RequestPacket): Promise<Response> {
    switch (requestPacket.method) {
      case HTTPMethod.GET: {
        return get(requestPacket.url).set(requestPacket.headers);
      }
      case HTTPMethod.POST: {
        return post(requestPacket.url).send(requestPacket.body).set(requestPacket.headers);
      }
      case HTTPMethod.PUT: {
        return put(requestPacket.url).send(requestPacket.body).set(requestPacket.headers);
      }
      case HTTPMethod.PATCH: {
        return patch(requestPacket.url).send(requestPacket.body).set(requestPacket.headers);
      }
      case HTTPMethod.DELETE: {
        return del(requestPacket.url).send(requestPacket.body).set(requestPacket.headers);
      }
      default: {
        throw new Error(`Unexpected Request Method Type: ${JSON.stringify(requestPacket)}`);
      }
    }
  }
}
