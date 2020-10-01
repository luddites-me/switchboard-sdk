import { Billing, CustomerInvoice } from 'ns8-billing-core';

export class BusinessMerchantBillingDetails {

  static readonly productPlanMap: Map<string, string> = new Map([
    ['free', 'free'],
    ['standard', 'starter'],
    ['plus', 'full'],
  ]);

  trialDaysRemaining: number;
  plan: string;
  firstBillingDate: number; // Unix (seconds)
  lastBillingDate: number; // Unix (seconds)
  lastBillingAmount: number; // Absolute amount (pennies)
  usagePeriodEnd?: number; // Instead of contract end date. Can be undefined for those who didn't accept ToS

  constructor(billing: Billing, invoices: CustomerInvoice[]) {
    this.trialDaysRemaining = billing ? this.calculateTrialDaysRemaining(billing) : -1;
    this.plan = billing ? this.productIdToPlan(billing) : '';

    const [firstInvoice, lastInvoice]: CustomerInvoice[] = this.getFirstAndLastInvoices(invoices);

    this.firstBillingDate = this.getBillingDate(firstInvoice);
    this.lastBillingDate = this.getBillingDate(lastInvoice);
    this.lastBillingAmount = lastInvoice ? lastInvoice.total : -1;
    this.usagePeriodEnd = billing ? billing.subscription.currentPeriodEnd : -1;
  }

  private calculateTrialDaysRemaining(billing: Billing): number {
    const secPerDay: number = 60 * 60 * 24;
    const nowUnix: number = new Date().getTime() / 1000;
    const {
      trialEndDate: trialEndDateUnix,
      isInTrial,
    }: {
      trialEndDate: number,
      isInTrial: boolean,
    }  = billing.subscription;
    const trialDaysRemaining: number = !isInTrial ? 0 : Math.abs((trialEndDateUnix - nowUnix) / secPerDay);
    return Math.floor(trialDaysRemaining);
  }

  private productIdToPlan(billing: Billing): string {
    const productPlan: string | undefined = billing.productType;
    if (!productPlan) {
      return 'n/a';
    }
    if (BusinessMerchantBillingDetails.productPlanMap.has(productPlan)) {
      return BusinessMerchantBillingDetails.productPlanMap.get(productPlan) || '';
    }
    return productPlan;
  }

  private getFirstAndLastInvoices(invoices: CustomerInvoice[]): CustomerInvoice[] {
    const lastInvoice: CustomerInvoice | undefined = invoices.find(
      (inv: CustomerInvoice) => inv.amountDue > 0,
    ) || {} as CustomerInvoice;
    const firstInvoice: CustomerInvoice | undefined  = invoices.reverse().find(
      (inv: CustomerInvoice) => inv.amountDue > 0,
    ) || {} as CustomerInvoice;

    return [firstInvoice, lastInvoice];
  }

  private getBillingDate(invoice: CustomerInvoice): number {
    // dueDate is nullable so fallback to created if it is missing
    return invoice ? (invoice.dueDate || invoice.created) : -1;
  }
}
