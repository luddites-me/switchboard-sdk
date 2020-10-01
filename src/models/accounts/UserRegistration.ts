import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MaxLength } from 'class-validator';

export class UserRegistration {
  @MaxLength(255)
  @IsNotEmpty()
  @IsEmail()
  email!: string;


  @IsNotEmpty()
  @IsString()
  password!: string;

  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  organizationName!: string;

  @IsNotEmpty()
  @IsPhoneNumber('ZZ')
  phoneNumber!: string;

  @MaxLength(255)
  @IsNotEmpty()
  @IsString()
  title!: string;
}
