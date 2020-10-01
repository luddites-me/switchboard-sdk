import { Source } from './Source';

export interface Switch {
  type: string;
  stepArnSuffix: string;
  name?: string;
  operator?: string;
  handler?: string;
  sources?: Source[];
}
