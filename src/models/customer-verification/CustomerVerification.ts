import { IsOptional } from 'class-validator';
import { CustomerVerificationStatus } from './CustomerVerificationStatus';


export class CustomerVerification {
  constructor(partial?: Partial<CustomerVerification>) {
    Object.assign(this, partial || {});
  }


  id!: string;


  status!: CustomerVerificationStatus;



  token!: string;



  code!: string;



  phone!: string;


  @IsOptional()
  emailSent?: Date;


  @IsOptional()
  resultReceived?: Date;


  @IsOptional()
  notifiedOfUpcomingCancellation?: Date;


  @IsOptional()
  expiration?: Date;


  @IsOptional()
  autoCancel?: Date;

  public isMatchingToken(token: string): boolean {
    return token === this.token;
  }

  public isMatchingCode(code: string): boolean {
    return code === this.code;
  }
}
