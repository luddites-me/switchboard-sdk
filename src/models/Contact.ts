import { IsEmail, IsEnum, IsOptional, IsPhoneNumber, IsString, IsUUID, MaxLength } from 'class-validator';
import { AuditObject } from './AuditObject';
import { ContactSourceType } from './ContactSourceType';



export class Contact extends AuditObject {

  constructor(partial?: Partial<Contact>) {
    super();
    Object.assign(this, partial || {});
  }


  id!: string;


  @IsString()
  @IsOptional()
  @MaxLength(50)
  firstName?: string;


  @IsString()
  @IsOptional()
  @MaxLength(50)
  lastName?: string;


  @IsString()
  @IsOptional()
  @MaxLength(255)
  name?: string;


  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;


  @IsOptional()
  @IsPhoneNumber('ZZ')
  @MaxLength(16)
  phone?: string;


  @IsString()
  @IsOptional()
  @MaxLength(255)
  companyName?: string;


  @IsString()
  @IsOptional()
  @MaxLength(50)
  country?: string;


  @IsUUID()
  @IsOptional()
  merchantId?: string;


  @IsOptional()
  @IsEnum(ContactSourceType)
  sourceType?: ContactSourceType = ContactSourceType.PLATFORM;

  public getFullName(): string | undefined {
    if (this.firstName && this.lastName) {
      return `${this.firstName} ${this.lastName}`;
    }
    return this.name;
  }
}
