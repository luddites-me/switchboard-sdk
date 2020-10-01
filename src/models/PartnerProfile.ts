import { IsBoolean, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, IsUUID, MaxLength } from 'class-validator';
import { IntegrationPlatformType, PartnerExpertise } from './';
import { AuditObject } from './AuditObject';

const MAX_CHAR: number = 0xff; // 255
const MAX_TEXT: number = 0xffff; // 65,535

export class PartnerProfileBase {
  constructor(partial?: Partial<PartnerProfileBase>) {
    Object.assign(this, partial || {});
  }



  @IsString()
  @IsOptional()
  @MaxLength(MAX_CHAR)
  organizationName?: string;


  @IsString()
  @IsOptional()
  @MaxLength(MAX_CHAR)
  location?: string;


  @IsString()
  @IsOptional()
  @MaxLength(MAX_CHAR)
  timezone?: string;


  @IsString()
  @IsOptional()
  @MaxLength(MAX_CHAR)
  website?: string;


  @IsString()
  @IsOptional()
  @MaxLength(MAX_TEXT)
  description?: string;


  @IsOptional()
  platformSupport?: IntegrationPlatformType[];


  @IsOptional()
  expertise?: PartnerExpertise[];


  @IsBoolean()
  isVisible!: boolean;



  @IsString()
  @IsOptional()
  @MaxLength(100)
  publicUrlSlug?: string;


  @IsString()
  @IsOptional()
  @MaxLength(MAX_CHAR)
  logoSrc?: string;
}


export class PartnerProfile extends PartnerProfileBase implements AuditObject {
  static readonly MAX_LOGO_SIZE: number = 1024 * 1024 * 5;

  constructor(partial?: Partial<PartnerProfile>) {
    super();
    Object.assign(this, partial || {});
  }


  @IsUUID()
  id!: string;

  /*
    Duplicate implementation of AuditObject via `implements` is part of
    a measure to deal with class validation and extension
    of the PartnerBase class (to be used for API validation).
  */


  /*
    Duplicate implementation of AuditObject via `implements` is part of
    a measure to deal with class validation and extension
    of the PartnerBase class (to be used for API validation).
  */
  createdAt!: Date;



  updatedAt!: Date;


  setCreatedAt(): void {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }


  setUpdatedAt(): void {
    this.updatedAt = new Date();
  }
}

export class PartnerProfileDTO {
  @IsBoolean()
  isVisible!: boolean;

  @IsString()
  @IsOptional()
  @MaxLength(MAX_CHAR)
  location?: string;

  @IsString()
  @IsOptional()
  @MaxLength(MAX_CHAR)
  website?: string;

  @IsString()
  @IsOptional()
  @MaxLength(MAX_TEXT)
  description?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(MAX_CHAR)
  organizationName!: string;

  @IsOptional()
  platformSupport?: IntegrationPlatformType[];

  @IsOptional()
  expertise?: PartnerExpertise[];
}

export class ResizePhoto {
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  width!: number;

  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  height!: number;

  @IsNotEmpty()
  s3key!: string;
}
