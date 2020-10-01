import {
    IsDate,
    IsEnum,
    IsString,
    IsUUID,
    MaxLength
} from 'class-validator';
import { IntegrationPlatformType } from './IntegrationPlatformType';

export class PartnerReferralRequest {

  constructor(partial?: Partial<PartnerReferralRequest>) {
    Object.assign(this, partial || {});
  }


  @IsUUID()
  id!: string;


  @IsString()
  @MaxLength(255)
  contactName!: string;


  @IsString()
  @MaxLength(255)
  website!: string;


  @IsDate()
  estimatedReferralDate!: Date;


  @IsEnum(IntegrationPlatformType)
  @MaxLength(50)
  platform!: IntegrationPlatformType;


  @IsUUID()
  partnerId!: string;
}
