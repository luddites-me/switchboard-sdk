import { IsEnum, IsString, IsUUID, MaxLength } from 'class-validator';
import { Merchant } from './Merchant';
import { ServiceIntegrationType } from './ServiceIntegrationType';


export class ServiceIntegration {

  constructor(partial?: Partial<ServiceIntegration>) {
    Object.assign(this, partial || {});
  }


  @IsUUID()
  id!: string;


  @IsEnum(ServiceIntegrationType)
  @MaxLength(50)
  type!: ServiceIntegrationType;


  @IsString()
  @MaxLength(100)
  token!: string;


  @IsString()
  @MaxLength(100)
  secret!: string;


  @IsString()
  @MaxLength(100)
  identityToken!: string;


  @IsString()
  @MaxLength(100)
  identitySecret!: string;


  metadata?: Object;


  private merchant!: Merchant;
}
