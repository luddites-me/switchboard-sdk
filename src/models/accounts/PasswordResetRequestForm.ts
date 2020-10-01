import { IsEmail, IsNotEmpty } from 'class-validator';

export class PasswordResetRequestForm {
  @IsNotEmpty()
  @IsEmail()
  email!: string;
}
