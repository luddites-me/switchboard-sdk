import { VerifiAccountClassification, VerifiEntityStatus } from '..';
import { VerifiObject } from './VerifiObject';

export class VerifiMerchantDetails extends VerifiObject {
  partnerMerchantId!: string;
  name!: string;
  requireAcquirerReferenceNumber!: 0 | 1;
  categoryCode!: string;
  status!: VerifiEntityStatus;
  accountBankName!: string;
  accountNumber!: number;
  accountClassification!: VerifiAccountClassification;
}
