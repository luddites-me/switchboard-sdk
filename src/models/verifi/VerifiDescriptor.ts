import { VerifiDescriptorSource, VerifiEntityStatus } from '..';
import { VerifiObject } from './VerifiObject';

export class VerifiDescriptor extends VerifiObject {
  partnerMerchantId!: string;
  partnerDescriptorId!: string;
  name!: string;
  appliedBy!: VerifiDescriptorSource;
  paymentDescriptor!: string;
  paymentDescriptorContact!: string;
  status!: VerifiEntityStatus;
  startDate!: string;
}
