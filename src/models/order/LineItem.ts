import { IsBoolean, IsISBN, IsNumber, IsOptional, IsString, MaxLength, ValidationError } from 'class-validator';
import { IValidatable } from '../interface/IValidatable';
import { ProtectValidator } from '../util/ProtectValidator';
import { Order } from './Order';


export class LineItem implements IValidatable {

  constructor(partial?: Partial<LineItem>) {
    Object.assign(this, partial || {});
  }


  id!: string;


  @IsString()
  @MaxLength(200)
  name!: string;


  @IsNumber()
  quantity!: number;


  @IsNumber()
  price!: number;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  platformId?: string;


  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  sku?: string;


  @IsOptional()
  @IsISBN()
  @MaxLength(13)
  isbn?: string;


  @IsOptional()
  @IsString()
  @MaxLength(13)
  ean13?: string;


  @IsOptional()
  @IsString()
  @MaxLength(13)
  upc?: string;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  variantId?: string;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  variantTitle?: string;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  vendor?: string;


  @IsOptional()
  @IsString()
  platformProductId?: string;


  @IsOptional()
  @IsBoolean()
  isGiftCard?: boolean;


  @IsOptional()
  @IsNumber()
  totalDiscount?: number;


  @IsOptional()
  @IsString()
  @MaxLength(100)
  manufacturer?: string;


  private order!: Order;

  public async isValid(): Promise<boolean> {
    return await ProtectValidator.isValid(this);
  }

  public async getValidationErrors(): Promise<ValidationError[]> {
    return await ProtectValidator.getValidationErrors(this);
  }
}
