import { Status } from 'ns8-protect-models';
import { MessageBase } from './MessageBase';

/**
 * Message to change the status of an order on the platform.
 * This should indicate whether to (1) approve an order or
 * (2) cancel an order or (3) place the order into fraud review
 */
export interface UpdateOrderStatus extends MessageBase {
  /**
   * Status: APPROVED, CANCELED, MERCHANT_REVIEW
   */
  newStatus: Status;
  /**
   * Current status of the order on the platform
   */
  platformStatus: string;
}
