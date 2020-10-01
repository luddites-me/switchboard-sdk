import { VerifiCaseStatus, VerifiCaseType } from '..';
import { VerifiObject } from './VerifiObject';

export class VerifiCaseDetails extends VerifiObject {
  merchantId!: number;
  type!: VerifiCaseType;
  status!: VerifiCaseStatus;
  statusCode?: number;
  date!: string;
  amount!: number;
  currency!: string;
  bin!: number;
  lastFour!: number;
  number!: string;
  acquirerReferenceNumber!: number;
  reasonCode!: string;
  networkTimestamp!: string;
  paymentDescriptor!: string;
  paymentDescriptorContact!: string;
  activityDate?: string;
  activityAmount?: number;
  activityCurrency?: string;
}
