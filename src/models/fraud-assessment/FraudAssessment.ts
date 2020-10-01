import { AuditObject } from '../AuditObject';
import { Order } from '../order/Order';
import { Grade } from './Grade';
import { ProviderType } from './ProviderType';
import { RiskFactor } from './RiskFactor';


export class FraudAssessment extends AuditObject {

  constructor(fraudAssessment?: Partial<FraudAssessment>) {
    super();
    Object.assign(this, fraudAssessment || {});
  }


  id!: string;


  providerType!: ProviderType;


  score?: number;


  grade?: Grade;


  providerRawResponse?: Object;


  factors?: RiskFactor[];


  private order!: Order;
}
