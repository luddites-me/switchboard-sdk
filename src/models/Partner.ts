import {
    IsBoolean,
    IsOptional,
    IsPhoneNumber,
    IsString,
    IsUUID,
    MaxLength,
    ValidateNested
} from 'class-validator';
import { v4 as uuidv4 } from 'uuid';
import { AuditObject } from './AuditObject';
import { PartnerProfile } from './PartnerProfile';

export class PartnerBase {

  constructor(partial?: Partial<PartnerBase>) {
    Object.assign(this, partial || {});
  }


  @IsString()
  @MaxLength(255)
  firstName!: string;


  @IsString()
  @MaxLength(255)
  lastName!: string;



  @IsString()
  @MaxLength(255)
  email!: string;


  @IsPhoneNumber('ZZ')
  @MaxLength(16)
  phone!: string;


  @IsString()
  @MaxLength(255)
  title!: string;

  @ValidateNested()
  profile!: PartnerProfile;
}


export class Partner extends PartnerBase implements AuditObject {

  constructor(partial?: Partial<Partner>) {
    super();
    Object.assign(this, partial || {});
  }


  @IsUUID()
  id!: string;



  @IsUUID()
  authId!: string;



  @IsUUID()
  secret!: string;



  @ValidateNested()
  profile!: PartnerProfile;


  @IsBoolean()
  @MaxLength(2)
  isEmailVerified!: boolean;


  @IsBoolean()
  @IsOptional()
  isAccountReviewed?: boolean;
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


  generateSecret(): void {
    if (!this.secret) {
      this.secret = uuidv4();
    }
  }


  setCreatedAt(): void {
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
  }


  setUpdatedAt(): void {
    this.updatedAt = new Date();
  }
}
