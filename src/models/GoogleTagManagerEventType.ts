export enum GoogleTagManagerEventType {
  onboardingComplete = 'onboard_complete',
  planSelected = 'plan_selected',
  installComplete = 'install_complete',
}

export interface GoogleTagManagerEvent {
  eventType: GoogleTagManagerEventType;
  merchantId: string;
  campaignId?: string;
}
