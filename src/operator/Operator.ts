import { Handler } from 'aws-lambda';

export interface Operator {
  handle: Handler<any, any>;
}
