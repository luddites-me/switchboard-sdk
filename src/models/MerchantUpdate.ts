import { IsEnum, IsOptional, IsString, MaxLength, ValidateNested } from 'class-validator';
import { Contact } from './Contact';
import { MerchantStatus } from './MerchantStatus';

export class MerchantUpdate {

  constructor(partial?: Partial<MerchantUpdate>) {
    Object.assign(this, partial || {});
  }

  @IsOptional()
  @IsString()
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsEnum(MerchantStatus)
  status?: MerchantStatus;

  @IsOptional()
  @ValidateNested()
  contact?: Contact;

  @IsOptional()
  @IsString()
  storefrontUrl?: string;
}
