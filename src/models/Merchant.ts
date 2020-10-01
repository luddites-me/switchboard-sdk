import { IsOptional, IsString, IsUrl, IsUUID, MaxLength, ValidateNested } from 'class-validator';
import { AccessToken } from './AccessToken';
import { AuditObject } from './AuditObject';
import { Contact } from './Contact';
import { IntegrationPlatform } from './IntegrationPlatform';
import { IntegrationPlatformType } from './IntegrationPlatformType';
import { MerchantStatus } from './MerchantStatus';
import { OrderRule } from './OrderRule';
import { Profile } from './Profile';
import { ServiceIntegration } from './ServiceIntegration';
import { ServiceIntegrationType } from './ServiceIntegrationType';
import { V1Migration } from './V1Migration';


export class Merchant extends AuditObject {

  constructor(partial?: Partial<Merchant>) {
    super();
    Object.assign(this, partial || {});
  }


  @IsUUID()
  id!: string;



  @ValidateNested()
  profile!: Profile;



  @ValidateNested()
  contact!: Contact;



  integrationPlatformType!: IntegrationPlatformType;



  @ValidateNested()
  integrationPlatform!: IntegrationPlatform;



  status!: MerchantStatus;



  acceptedTermsAt!: Date;


  @IsString()
  platformId!: string;


  accessTokens: AccessToken[] = [];


  @IsUrl()
  domain!: string;


  @IsString()
  @MaxLength(255)
  name!: string;



  serviceIntegrations!: ServiceIntegration[];


  @IsOptional()
  orderRules?: OrderRule[];




  v1Migration?: V1Migration;



  billingId?: string;



  storefrontUrl!: string;



  usageReportingScheduleBucket!: number;


  @IsString()
  @MaxLength(4)
  verificationCode!: string;



  verifiedEmailAt!: Date;


  @IsUUID()
  @IsOptional()
  partnerId?: string;


  @IsOptional()
  onboardingStorefrontUrl?: string;



  setOrderRulesIndex(): void {
    if (this.orderRules) {
      this.orderRules.map((orderRule: OrderRule, index: number) => orderRule.index = index);
    }
  }

  public addOrderRule(orderRule: OrderRule): void {
    if (!this.orderRules) {
      this.orderRules = [];
    }
    orderRule.index = this.orderRules.length;
    this.orderRules.push(orderRule);
  }

  public findOrderRule(id: string): OrderRule {
    const rule = this.orderRules?.find((rule: OrderRule) => rule.id === id);
    return rule ? rule : new OrderRule({});
  }

  public getServiceIntegration(type: ServiceIntegrationType): ServiceIntegration | undefined {
    return this.serviceIntegrations.find((integration: ServiceIntegration) => integration.type === type);
  }
}
