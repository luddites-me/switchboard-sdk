import { VerifiDescriptor } from './VerifiDescriptor';
import { VerifiMerchantDetails } from './VerifiMerchantDetails';

export class VerifiMerchantConfiguration {
  merchantDetails?: VerifiMerchantDetails;
  descriptors: VerifiDescriptor[] = [];
}
