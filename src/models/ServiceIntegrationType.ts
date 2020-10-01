import { IntegrationPlatformType } from './IntegrationPlatformType';

export enum ServiceIntegrationType {
  BIGCOMMERCE = 'BIGCOMMERCE',
  MAGENTO = 'MAGENTO',
  PRESTASHOP = 'PRESTASHOP',
  SALESFORCE = 'SALESFORCE',
  SAP = 'SAP',
  SHOPIFY = 'SHOPIFY',
  THIRTYBEES = 'THIRTYBEES',
  TRUE_STATS = 'TRUE_STATS',
  XCART = 'XCART',
  WOOCOMMERCE = 'WOOCOMMERCE',
}

// typedef requirement here would be unnecessarily verbose
// tslint:disable-next-line: typedef
export const toServiceIntegrationType = (type: IntegrationPlatformType): ServiceIntegrationType => {
  switch (type) {
    case IntegrationPlatformType.BIGCOMMERCE:
      return ServiceIntegrationType.BIGCOMMERCE;
    case IntegrationPlatformType.MAGENTO:
      return ServiceIntegrationType.MAGENTO;
    case IntegrationPlatformType.PRESTASHOP:
      return ServiceIntegrationType.PRESTASHOP;
    case IntegrationPlatformType.SALESFORCE:
      return ServiceIntegrationType.SALESFORCE;
    case IntegrationPlatformType.SAP:
      return ServiceIntegrationType.SAP;
    case IntegrationPlatformType.SHOPIFY:
      return ServiceIntegrationType.SHOPIFY;
    case IntegrationPlatformType.XCART:
      return ServiceIntegrationType.XCART;
    case IntegrationPlatformType.WOOCOMMERCE:
      return ServiceIntegrationType.WOOCOMMERCE;
    default:
      throw new Error(`Could not map ${type} to an ServiceIntegrationType.`);
  }
};
