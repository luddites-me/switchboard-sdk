//import { FraudAssessment, Risk, Status } from '..';
import { FraudAssessment, Risk, Status } from '../..';
import { SwitchEventType } from '../enums';

/**
 * Message to signal a order has changed.
 */
export interface OrderMessage {
  /**
   * Action: UPDATE_EQ8_SCORE_EVENT, UPDATE_ORDER_RISK_EVENT, UPDATE_ORDER_STATUS_EVENT
   */
  action: SwitchEventType;
  /**
   * Collection of scoring assessments
   */
  fraudData?: FraudAssessment[];
  /**
   * Platform's Order ID
   */
  orderId: string;
  /**
   * Current status of the order on the platform
   */
  platformStatus: string;
  /**
   * Risk: LOW, MEDIUM, HIGH
   */
  risk?: Risk;
  /**
   * EQ8 score, between 0 - 1000
   */
  score: string;
  /**
   * Status: APPROVED, CANCELED, MERCHANT_REVIEW
   */
  status: Status;
}
