import { IsEmail } from 'class-validator';

export class TestCustomerVerificationRequest {
  @IsEmail()
  email!: string;
}
