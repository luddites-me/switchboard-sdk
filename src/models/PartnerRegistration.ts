import { IsString } from 'class-validator';
import { PartnerBase } from './Partner';

export class PartnerRegistration extends PartnerBase {
  @IsString()
  password!: string;
}
