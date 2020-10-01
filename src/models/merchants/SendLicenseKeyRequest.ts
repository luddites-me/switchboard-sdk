import { IsEmail, IsString } from 'class-validator';

export class SendLicenseKeyRequest {
  @IsEmail()
  email!: string;

  @IsString()
  licenseKey!: string;
}
