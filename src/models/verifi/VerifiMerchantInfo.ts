import { IsJSON, IsUUID } from 'class-validator';
import { AuditObject } from '../index';
import { VerifiMerchantConfiguration } from './VerifiMerchantConfiguration';


export class VerifiMerchantInfo extends AuditObject {

  constructor(merchantDataPartial?: Partial<VerifiMerchantInfo>) {
    super();
    Object.assign(this, merchantDataPartial || {});
  }


  @IsUUID()
  id!: string;


  @IsUUID()
  merchantId!: string;


  @IsJSON()
  configuration?: VerifiMerchantConfiguration;
}
