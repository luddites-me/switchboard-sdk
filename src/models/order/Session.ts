import { IsIP, IsNumber, IsOptional, IsString, ValidationError } from 'class-validator';
import { IValidatable } from '../interface/IValidatable';
import { ProtectValidator } from '../util/ProtectValidator';


export class Session implements IValidatable {

  constructor(partial?: Partial<Session>) {
    Object.assign(this, partial || {});
  }


  id!: string;


  @IsIP()
  ip!: string;


  @IsOptional()
  @IsString()
  userAgent?: string;


  @IsOptional()
  @IsString()
  acceptLanguage?: string;


  @IsOptional()
  @IsNumber()
  screenHeight?: number;


  @IsOptional()
  @IsNumber()
  screenWidth?: number;

  public async isValid(): Promise<boolean> {
    return await ProtectValidator.isValid(this);
  }

  public async getValidationErrors(): Promise<ValidationError[]> {
    return await ProtectValidator.getValidationErrors(this);
  }
}
