import {
    IsBoolean,
    IsDate,








    IsEmail, IsEnum,
    IsInt,
    IsOptional,






    IsPhoneNumber, IsString,
    IsUUID,
    Max,
    MaxLength,
    Min
} from 'class-validator';
import { AuditObject } from './AuditObject';
import { InterceptOption } from './InterceptOption';
import { Risk } from './order/Risk';
import { Status } from './order/Status';
import { WhitePagesThresholdStatus } from './WhitePagesThresholdStatus';


export class Profile extends AuditObject {
  constructor(partial?: Partial<Profile>) {
    super();
    Object.assign(this, partial || {});
  }


  @IsUUID()
  @IsOptional()
  id?: string;


  @IsString()
  @MaxLength(36)
  timezone!: string;


  @IsEnum(InterceptOption)
  interceptPaymentCapture!: InterceptOption;


  @IsBoolean()
  emailOnCancel!: boolean;


  @IsInt()
  @Min(0)
  @Max(1000)
  validOrderThreshold!: number;


  @IsInt()
  @Min(0)
  @Max(1000)
  remarketingThreshold!: number;


  @IsInt()
  @Min(0)
  @Max(1000)
  lowRiskScoreThreshold!: number;


  @IsInt()
  @Min(0)
  @Max(1000)
  highRiskScoreThreshold!: number;


  @IsEnum(WhitePagesThresholdStatus)
  whitePagesThresholdStatus!: WhitePagesThresholdStatus;


  @IsInt()
  @Min(0)
  @Max(1000)
  whitePagesLowRiskScoreThreshold!: number;


  @IsInt()
  @Min(0)
  @Max(1000)
  whitePagesHighRiskScoreThreshold!: number;


  @IsOptional()
  @IsEnum(Risk)
  customerVerificationDeniedRisk?: Risk;


  @IsOptional()
  @IsEnum(Status)
  customerVerificationDeniedStatus?: Status;


  @IsOptional()
  @IsEnum(Risk)
  customerVerificationApprovedRisk?: Risk;


  @IsOptional()
  @IsEnum(Status)
  customerVerificationApprovedStatus?: Status;


  @IsOptional()
  @IsString()
  @MaxLength(255)
  customerVerificationEmailSubject?: string | null;


  @IsOptional()
  @IsString()
  @MaxLength(2048)
  customerVerificationEmailBody?: string | null;


  @IsOptional()
  @IsString()
  @MaxLength(255)
  customerVerificationSupportName?: string | null;


  @IsOptional()
  @IsEmail(undefined, {
    message: 'Please enter a valid email address.',
  })
  @MaxLength(255)
  customerVerificationSupportEmail?: string | null;


  @IsOptional()
  @IsPhoneNumber('ZZ', {
    message: 'Please enter a valid phone number including the international code. For example, +18885551212',
  })
  @MaxLength(16, {
    message: 'A valid phone number must not exceed 16 digits.',
  })
  customerVerificationSupportPhone?: string | null;


  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(168, {
    message: 'Can not be greater than 7 days.',
  }) // 168 hours is 7 days
  customerVerificationExpirationWindow?: number | null;


  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(336, {
    message: 'Can not be greater than 14 days.',
  }) // 336 hours is 14 days
  customerVerificationAutoCancelWindow?: number | null;


  @IsOptional()
  @IsDate()
  customerVerificationTestSent?: Date;


  @IsOptional()
  @IsString()
  @MaxLength(255)
  merchantLogoUrl?: string | null;


  @IsBoolean()
  isMigratedToEkataExtensionFramework!: boolean;


  @IsOptional()
  settings?: Object;
}
