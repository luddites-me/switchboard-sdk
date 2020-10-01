import { IsBoolean, IsDate, IsNumber, IsOptional, IsString, MaxLength, ValidationError } from 'class-validator';
import { IValidatable } from '../interface/IValidatable';
import { ProtectValidator } from '../util/ProtectValidator';


export class Customer implements IValidatable {

  constructor(partial?: Partial<Customer>) {
    Object.assign(this, partial || {});
  }


  id!: string;


  @IsOptional()
  @IsString()
  @MaxLength(50)
  firstName?: string;


  @IsString()
  @MaxLength(50)
  lastName!: string;


  @IsOptional()
  @MaxLength(254)
  email?: string;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  platformId?: string;


  @IsDate()
  @IsOptional()
  platformCreatedAt?: Date;


  @IsOptional()
  @MaxLength(200)
  phone?: string;


  @IsOptional()
  @IsString()
  @MaxLength(1)
  gender?: string;


  @IsOptional()
  @IsDate()
  birthday?: Date;


  @IsOptional()
  @IsString()
  @MaxLength(200)
  company?: string;


  @IsOptional()
  @IsNumber()
  totalSpent?: number;


  @IsOptional()
  @IsBoolean()
  isEmailVerified?: boolean;


  @IsOptional()
  @IsBoolean()
  isPayingCustomer?: boolean;

  public async isValid(): Promise<boolean> {
    return await ProtectValidator.isValid(this);
  }

  public async getValidationErrors(): Promise<ValidationError[]> {
    return await ProtectValidator.getValidationErrors(this);
  }
}
