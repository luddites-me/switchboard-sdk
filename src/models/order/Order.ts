import {
    IsBoolean,
    IsDate,
    IsDefined,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
    ValidateNested,
    ValidationError
} from 'class-validator';
import { AuditObject } from '../AuditObject';
import { CustomerVerification } from '../customer-verification/CustomerVerification';
import { FraudAssessment } from '../fraud-assessment/FraudAssessment';
import { ProviderType } from '../fraud-assessment/ProviderType';
import { Address } from './Address';
import { Customer } from './Customer';
import { LineItem } from './LineItem';
import { Risk } from './Risk';
import { Session } from './Session';
import { Status } from './Status';
import { Transaction } from './Transaction';


export class Order extends AuditObject {
  constructor(partial?: Partial<Order>) {
    super();
    Object.assign(this, partial || {});
  }


  id!: string;


  @IsUUID()
  merchantId!: string;



  @ValidateNested()
  @IsDefined()
  customer!: Customer;



  @ValidateNested()
  @IsDefined()
  session!: Session;




  customerVerification?: CustomerVerification;


  @IsOptional()
  verificationHistory?: CustomerVerification[];


  @ValidateNested()
  addresses!: Address[];

  public addAddress(...addresses: Address[]): void {
    if (!this.addresses) {
      this.addresses = [];
    }
    this.addresses.push(...addresses);
  }


  @ValidateNested()
  transactions!: Transaction[];


  @ValidateNested()
  lineItems!: LineItem[];




  fraudAssessments!: FraudAssessment[];

  public addFraudAssessment(...fraudAssessments: FraudAssessment[]): void {
    if (!this.fraudAssessments) {
      this.fraudAssessments = [];
    }
    this.fraudAssessments.push(...fraudAssessments);
  }

  public getFraudAssessment(type: ProviderType): FraudAssessment | undefined {
    if (this.fraudAssessments) {
      return this.fraudAssessments.find((assessment: FraudAssessment) => assessment.providerType === type);
    }
    return undefined;
  }


  @IsString()
  @MaxLength(100)
  platformId!: string;


  @IsString()
  @MaxLength(100)
  name!: string;


  @IsDate()
  @IsOptional()
  platformCreatedAt?: Date;


  @IsString()
  @MaxLength(3)
  currency!: string;


  @IsNumber()
  totalPrice!: number;



  status: Status = Status.MERCHANT_REVIEW;



  risk!: Risk;


  @IsOptional()
  @IsBoolean()
  hasGiftCard?: boolean;


  @IsOptional()
  @IsString()
  @MaxLength(255)
  platformStatus?: string;

  public canBeModified(): boolean {
    return this.status === Status.MERCHANT_REVIEW;
  }

  /**
   * Determines if any related class is invalid.
   */
  public async isValid(): Promise<boolean> {
    let anyInvalids: boolean = false;
    try {
      anyInvalids =
        await this.addresses?.some(async (a: Address) => !a.isValid()) ||
        await !this.customer.isValid() ||
        await this.lineItems?.some(async (a: LineItem) => !a.isValid()) ||
        await this.transactions?.some(async (a: Transaction) => !a.isValid()) ||
        await !this.session.isValid();
    } catch (e) {
      console.log(`Validation failed. ${e.message}`);
    }
    // If any entity is invalid, the order is invalid
    return !anyInvalids;
  }

  /**
   * Returns all validation errors for this order
   */
  public async getValidationErrors(): Promise<ValidationError[]> {
    let validationErrors: ValidationError[] = [];
    try {
      if (!this.isValid()) {
        this.addresses?.forEach(async (a: Address) => {
          const errors: ValidationError[] = await a.getValidationErrors();
          validationErrors = validationErrors.concat(errors);
        });
        validationErrors = validationErrors.concat(await this.customer.getValidationErrors());
        this.lineItems?.forEach(async (a: LineItem) => {
          const errors: ValidationError[] = await a.getValidationErrors();
          validationErrors = validationErrors.concat(errors);
        });
        this.transactions?.forEach(async (a: Transaction) => {
          const errors: ValidationError[] = await a.getValidationErrors();
          validationErrors = validationErrors.concat(errors);
        });
        validationErrors = validationErrors.concat(await this.session.getValidationErrors());
      }
    } catch (e) {
      console.log(`Validation failed. ${e.message}`);
    }
    return validationErrors;
  }
}
