import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { AuditObject } from './AuditObject';
import { Merchant } from './Merchant';
import { MerchantStatus } from './MerchantStatus';
import { OrderRuleAction } from './OrderRuleAction';


export class OrderRule extends AuditObject{
  public constructor(partial: Partial<OrderRule>) {
    super();
    Object.assign(this, partial || {});
  }


  @IsUUID()
  @IsOptional()
  id?: string;


  @IsEnum(MerchantStatus)
  status: MerchantStatus = MerchantStatus.ACTIVE;


  @IsNotEmpty()
  query!: Object;


  @IsEnum(OrderRuleAction)
  action!: OrderRuleAction;


  @IsInt()
  @IsOptional()
  index?: number;


  @IsString()
  @IsOptional()
  @MaxLength(36)
  name?: string;


  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;


  merchant!: Merchant;

  public canBeExecuted(isWppActive: boolean): boolean {
    if (this.action === OrderRuleAction.EXECUTE_WPP && !isWppActive) {
      return false;
    }
    return this.status === MerchantStatus.ACTIVE;
  }
}
