/* eslint-disable */
import { Status } from '..';

/**
 * Safely converts a string to a Status
 * @param orderStatus - A status to attempt to parse
 * @returns Status; defaults to 'MERCHANT_REVIEW' if not parsable
 * @public
 */
export const stringToProtectStatus = (orderStatus = ''): Status => {
  switch (orderStatus.toLowerCase().trim().replace('_', '')) {
    case 'approval':
    case 'approve':
    case 'approved':
      return Status.APPROVED;
    case 'cancel':
    case 'canceled':
    case 'cancelled':
      return Status.CANCELLED;
    case 'merchantreview':
    case 'pending':
    case 'review':
      return Status.MERCHANT_REVIEW;
    default:
      return Status.MERCHANT_REVIEW;
  }
};
