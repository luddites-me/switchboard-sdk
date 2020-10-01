import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordResetForm {

  @IsNotEmpty()
  @IsString()
  password!: string;
}
