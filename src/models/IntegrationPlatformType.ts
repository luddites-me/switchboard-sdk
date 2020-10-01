import { ServiceIntegrationType } from './ServiceIntegrationType';

export enum IntegrationPlatformType {
  BIGCOMMERCE = 'BIGCOMMERCE',
  MAGENTO = 'MAGENTO',
  PRESTASHOP = 'PRESTASHOP',
  SALESFORCE = 'SALESFORCE',
  SAP = 'SAP',
  SHOPIFY = 'SHOPIFY',
  THIRTYBEES = 'THIRTYBEES',
  XCART = 'XCART',
  WOOCOMMERCE = 'WOOCOMMERCE',
}

// typedef requirement here would be unnecessarily verbose
// tslint:disable-next-line: typedef
export const toIntegrationPlatformType = (type: ServiceIntegrationType): IntegrationPlatformType => {
  switch (type) {
    case ServiceIntegrationType.BIGCOMMERCE:
      return IntegrationPlatformType.BIGCOMMERCE;
    case ServiceIntegrationType.MAGENTO:
      return IntegrationPlatformType.MAGENTO;
    case ServiceIntegrationType.PRESTASHOP:
      return IntegrationPlatformType.PRESTASHOP;
    case ServiceIntegrationType.SALESFORCE:
      return IntegrationPlatformType.SALESFORCE;
    case ServiceIntegrationType.SAP:
      return IntegrationPlatformType.SAP;
    case ServiceIntegrationType.SHOPIFY:
      return IntegrationPlatformType.SHOPIFY;
    case ServiceIntegrationType.THIRTYBEES:
      return IntegrationPlatformType.THIRTYBEES;
    case ServiceIntegrationType.XCART:
      return IntegrationPlatformType.XCART;
    case ServiceIntegrationType.WOOCOMMERCE:
      return IntegrationPlatformType.WOOCOMMERCE;
    default:
      throw new Error(`Could not map ${type} to an IntegrationPlatformType.`);
  }
};
