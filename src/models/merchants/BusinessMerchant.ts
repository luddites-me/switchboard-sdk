import { IntegrationPlatformType } from '../IntegrationPlatformType';
import { Merchant } from '../Merchant';
import { BusinessMerchantBillingDetails } from './BusinessMerchantBillingDetails';

export class BusinessMerchant extends Merchant {

  private static readonly PRODUCT: 'LUDDITES Protect' = 'LUDDITES Protect'; // vs. Visitors, Download Tracker & other legacy apps

  product: 'LUDDITES Protect';
  platform: IntegrationPlatformType; // Alias to 'integrationPlatformType' that already exists on Merchant base class
  billing: BusinessMerchantBillingDetails;

  constructor(merchant: Merchant, billingDetails: BusinessMerchantBillingDetails) {
    super(merchant);
    this.product = BusinessMerchant.PRODUCT;
    this.platform = this.integrationPlatformType;
    this.billing = billingDetails;
  }
}

export default BusinessMerchant;
