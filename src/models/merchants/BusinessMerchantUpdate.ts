import { IsEmail, IsOptional, IsPhoneNumber, IsString, IsUrl, IsUUID, MaxLength, ValidateNested } from 'class-validator';

class BusinessMerchantContactUpdate {
  @IsString()
  @IsOptional()
  @MaxLength(50)
  firstName?: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  lastName?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsPhoneNumber('ZZ')
  @MaxLength(16)
  phone?: string;
}

class BusinessMerchantProfileUpdate {
  @IsOptional()
  @IsString()
  @MaxLength(36)
  timezone!: string;
}

export class BusinessMerchantUpdate {

  constructor(partial?: Partial<BusinessMerchantUpdate>) {
    Object.assign(this, partial || {});
  }

  @IsOptional()
  @ValidateNested()
  contact?: BusinessMerchantContactUpdate;

  @IsOptional()
  @ValidateNested()
  profile?: BusinessMerchantProfileUpdate;

  @IsOptional()
  @IsString()
  @IsUrl()
  storefrontUrl?: string;

  @IsUUID()
  @IsOptional()
  partnerId?: string;
}
