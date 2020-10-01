import { IsDate, IsEnum, IsNumber, IsOptional, IsString, MaxLength, ValidateNested, ValidationError } from 'class-validator';
import { IValidatable } from '../interface/IValidatable';
import { ProtectValidator } from '../util/ProtectValidator';
import { CreditCard } from './CreditCard';
import { Order } from './Order';
import { TransactionMethod } from './TransactionMethod';
import { TransactionStatus } from './TransactionStatus';


export class Transaction implements IValidatable {

  constructor(partial?: Partial<Transaction>) {
    Object.assign(this, partial || {});
  }


  id!: string;



  @IsOptional()
  @ValidateNested()
  creditCard?: CreditCard;


  @IsNumber()
  amount!: number;


  @IsString()
  @MaxLength(3)
  currency!: string;


  @IsOptional()
  @IsEnum(TransactionStatus)
  status?: TransactionStatus;


  @IsOptional()
  @IsString()
  @MaxLength(65535)
  statusDetails?: string;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  platformId?: string;


  @IsOptional()
  @IsEnum(TransactionMethod)
  method?: TransactionMethod;


  @IsDate()
  processedAt!: Date;


  private order!: Order;

  public async isValid(): Promise<boolean> {
    return ProtectValidator.isValid(this);
  }

  public async getValidationErrors(): Promise<ValidationError[]> {
    return await ProtectValidator.getValidationErrors(this);
  }
}
