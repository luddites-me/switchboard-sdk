import { IsEnum, IsOptional, IsString, MaxLength, ValidationError } from 'class-validator';
import { IValidatable } from '../interface/IValidatable';
import { ProtectValidator } from '../util/ProtectValidator';
import { CreditCardTransactionType } from './CreditCardTransactionType';


export class CreditCard implements IValidatable {

  constructor(partial?: Partial<CreditCard>) {
    Object.assign(this, partial || {});
  }


  id!: string;


  @IsEnum(CreditCardTransactionType)
  transactionType!: CreditCardTransactionType;


  @IsOptional()
  @IsString()
  creditCardNumber?: string;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  creditCardCompany?: string;


  @IsOptional()
  @IsString()
  @MaxLength(10)
  cardExpiration?: string;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  cardHolder?: string;


  @IsOptional()
  @IsString()
  @MaxLength(36)
  avsResultCode?: string;


  @IsOptional()
  @IsString()
  @MaxLength(36)
  cvvResultCode?: string;


  @IsOptional()
  @IsString()
  @MaxLength(10)
  creditCardBin?: string;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  gateway?: string;

  public async isValid(): Promise<boolean> {
    return ProtectValidator.isValid(this);
  }

  public async getValidationErrors(): Promise<ValidationError[]> {
    return await ProtectValidator.getValidationErrors(this);
  }
}
