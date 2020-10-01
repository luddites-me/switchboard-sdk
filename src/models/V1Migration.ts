import { AuditObject } from './AuditObject';


export class V1Migration extends AuditObject{
  constructor(partial?: Partial<V1Migration>) {
    super();
    Object.assign(this, partial || {});
  }


  id!: string;


  domain!: string;


  billingDate!: Date;


  recurringChargeId!: number;


  trialEndDate!: Date;


  product!: string;


  status!: string;
}
