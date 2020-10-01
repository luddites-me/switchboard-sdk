import { ValidateNested } from 'class-validator';
import { OrderRule } from './OrderRule';

export class OrderRulesUpdate {
  public constructor(orderRules: OrderRule[]) {
    this.orderRules = orderRules;
  }

  @ValidateNested({ each: true })
  orderRules: OrderRule[];

}
