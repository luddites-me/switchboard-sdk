import { IsEnum, IsNumber, IsOptional, IsString, MaxLength, ValidationError } from 'class-validator';
import { IValidatable } from '../interface/IValidatable';
import { ProtectValidator } from '../util/ProtectValidator';
import { AddressType } from './AddressType';
import { Order } from './Order';


export class Address implements IValidatable {

  constructor(partial?: Partial<Address>) {
    Object.assign(this, partial || {});
  }


  id!: string;


  @IsEnum(AddressType)
  type!: AddressType;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;


  @IsOptional()
  @IsString()
  @MaxLength(200)
  company?: string;


  @IsOptional()
  @IsString()
  @MaxLength(65535)
  address1?: string;


  @IsOptional()
  @IsString()
  @MaxLength(65535)
  address2?: string;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  city?: string;


  @IsOptional()
  @IsString()
  @MaxLength(200)
  zip?: string;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  region?: string;


  @IsOptional()
  @IsString()
  @MaxLength(6)
  regionCode?: string;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  country?: string;


  @IsOptional()
  @IsString()
  @MaxLength(2)
  countryCode?: string;


  @IsOptional()
  @IsNumber()
  latitude?: number;


  @IsOptional()
  @IsNumber()
  longitude?: number;

  public getFormatted(): string {
    // tslint:disable-next-line:max-line-length
    return `${this.address1 || ''}, ${this.city || ''}, ${this.regionCode || ''} ${this.zip || ''}, ${this.countryCode || ''}`;
  }


  private order!: Order;

  public async isValid(): Promise<boolean> {
    return ProtectValidator.isValid(this);
  }

  public async getValidationErrors(): Promise<ValidationError[]> {
    return await ProtectValidator.getValidationErrors(this);
  }
}
