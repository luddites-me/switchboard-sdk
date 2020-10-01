import { VerifiCaseStatus } from '..';
import { VerifiObject } from './VerifiObject';

export class VerifiCaseUpdate extends VerifiObject {
  merchantId?: number;
  status?: VerifiCaseStatus;
  statusCode?: number;
  activityDate?: string;
  activityAmount?: number;
  activityCurrency?: string;
}
