import { IntegrationPlatformType, PartnerReferralRequest } from '..';
/*
  This file exists to temporarily provide mock data to the PartnerReferralRequestDao. It will
  be removed as soon as the data model is settled upon.
*/
export class MockPartnerReferralRequestUtils {
  private static partnerParams: Partial<PartnerReferralRequest> = {
    id: '1092',
    website: 'pamcakes.com',
    platform: IntegrationPlatformType.SHOPIFY,
    estimatedReferralDate: new Date(Date.now()),
    contactName: 'Pam Cakes',
    partnerId: 'e9698bbe-44cc-4300-bd21-8dc3fe8d414f',
  };

  private static mockPartnerReferralRequest: PartnerReferralRequest =
    new PartnerReferralRequest({ ...MockPartnerReferralRequestUtils.partnerParams });

  public static get(id: string): PartnerReferralRequest {
    return this.mockPartnerReferralRequest;
  }

  public static save(partner: Partial<PartnerReferralRequest>): PartnerReferralRequest {
    const newRequest: PartnerReferralRequest =
      new PartnerReferralRequest({ ...partner, id: '05fde129-d7f2-42ed-ac52-5cfe82644826' });
    this.mockPartnerReferralRequest = newRequest;

    return this.mockPartnerReferralRequest;
  }

}
