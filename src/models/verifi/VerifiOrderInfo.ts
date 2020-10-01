import { IsJSON, IsString, IsUUID } from 'class-validator';
import { AuditObject } from '../index';
import { VerifiCaseDetails } from './VerifiCaseDetails';


export class VerifiOrderInfo extends AuditObject {

  constructor(orderDataPartial?: Partial<VerifiOrderInfo>) {
    super();
    Object.assign(this, orderDataPartial || {});
  }


  @IsUUID()
  id!: string;


  @IsString()
  orderId!: string;


  @IsString()
  orderName!: string;


  @IsJSON()
  verifiCaseDetails?: VerifiCaseDetails;
}
