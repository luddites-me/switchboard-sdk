import { SwitchContext } from 'ns8-switchboard-interfaces';
import { ServiceIntegrationType } from 'ns8-protect-models';

/**
 * Asserts that the merchant has the expected integration
 * @param context - the Switch Context
 * @param integrationType - a known service integration type
 * @throws if no match is found
 * @returns true if a match is found
 * @public
 */
export const validateMerchantIntegration = (
  context: SwitchContext,
  integrationType: ServiceIntegrationType,
): boolean => {
  const match = context.merchant?.serviceIntegrations?.find((integration) => {
    return integration.type === integrationType;
  })?.type;

  if (match !== integrationType)
    throw new Error(
      `No ${integrationType} Service Integration Type defined on this merchant "${context.merchant?.name}"`,
    );
  return true;
};
