import { Status } from 'ns8-protect-models';
import { MessageBase } from './MessageBase';

/**
 * Message to indicate a change to the NS8 Status of an order
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
