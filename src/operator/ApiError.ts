/* eslint-disable @typescript-eslint/ban-types */
// Temporary solution for now. The proper solution is to type this as `Record<string, unknown>`,
// but see discussion at https://github.com/microsoft/TypeScript/issues/21732 for reasons and ramifications.
import { Response } from 'superagent';

export class ApiError extends Error {
  name: string;
  status: number;
  request: object | undefined;
  responseHeaders: object;
  data: any;

  constructor(request: object | undefined, response: Response, data?: any) {
    super('Operator V2Client - Protect API error');
    this.name = this.constructor.name;
    this.status = response.status;
    this.request = request;
    this.responseHeaders = response.header;
    this.data = data;
  }
}
