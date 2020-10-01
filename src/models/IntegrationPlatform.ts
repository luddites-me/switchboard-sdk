import { IsEnum, IsJSON, IsOptional, IsString, IsUUID, MaxLength } from 'class-validator';
import { IntegrationPlatformType } from './IntegrationPlatformType';


export class IntegrationPlatform {

  constructor(partial?: Partial<IntegrationPlatform>) {
    Object.assign(this, partial || {});
  }


  @IsUUID()
  id!: string;


  @IsEnum(IntegrationPlatformType)
  @MaxLength(50)
  name!: IntegrationPlatformType;


  @IsString()
  @MaxLength(100)
  displayName!: string;


  @IsString()
  @IsOptional()
  @MaxLength(255)
  orderDetailsUrlTemplate?: string;


  @IsString()
  @IsOptional()
  @MaxLength(255)
  customerVerificationUrlTemplate?: string;


  @IsJSON()
  @IsOptional()
  config?: Object;
}
