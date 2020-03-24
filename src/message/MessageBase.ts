import { SwitchEventType } from 'ns8-switchboard-interfaces';
import { Status } from 'ns8-protect-models';

/**
 * Base class from which all messages extend
 */
export interface MessageBase {
  /**
   * Action: UPDATE_EQ8_SCORE_EVENT, UPDATE_ORDER_RISK_EVENT, UPDATE_ORDER_STATUS_EVENT
   */
  action: SwitchEventType;
  /**
   * Platform's Order ID
   */
  orderId: string;
  /**
   * EQ8 score, between 0 - 1000
   */
  score: string;
  /**
   * Status: APPROVED, CANCELED, MERCHANT_REVIEW
   */
  status: Status;
}
