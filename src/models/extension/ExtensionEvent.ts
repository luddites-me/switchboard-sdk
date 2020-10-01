import { IsEnum, IsOptional, IsString } from 'class-validator';
import { AuditObject } from '../AuditObject';
import { IntegrationPlatformType } from '../IntegrationPlatformType';


export class ExtensionEvent extends AuditObject {
  constructor(partial?: Partial<ExtensionEvent>) {
    super();
    Object.assign(this, partial || {});
  }


  id!: string;


  @IsString()
  merchantId!: string;


  @IsString()
  extensionId!: string;


  @IsEnum(IntegrationPlatformType)
  integration!: IntegrationPlatformType;


  @IsString()
  @IsOptional()
  orderId?: string;


  @IsOptional()
  metadata?: Object;


  @IsString()
  @IsOptional()
  action?: string;
}
