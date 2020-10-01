import { IsEnum, IsOptional, IsPhoneNumber } from 'class-validator';
import { CustomerVerificationStatus } from './CustomerVerificationStatus';

export class CustomerVerificationUpdate {

  constructor(partial?: Partial<CustomerVerificationUpdate>) {
    Object.assign(this, partial || {});
  }

  @IsEnum(CustomerVerificationStatus)
  status!: CustomerVerificationStatus;

  @IsOptional()
  @IsPhoneNumber('ZZ', {
    message: 'The phone number you entered is not valid. Please enter a valid SMS capable phone number code.',
  })
  phone?: string;

  public isEmailSent = (): boolean => this.status === CustomerVerificationStatus.EMAIL_SENT;
  public isDenied = (): boolean => this.status === CustomerVerificationStatus.CUSTOMER_DENIED;
  public isSmsSend = (): boolean => this.status === CustomerVerificationStatus.SMS_SEND;
  public isVerified = (): boolean => this.status === CustomerVerificationStatus.SMS_VERIFIED;
}
