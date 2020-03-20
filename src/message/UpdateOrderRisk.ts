import { FraudAssessment, Risk } from 'ns8-protect-models';
import { MessageBase } from './MessageBase';

/**
 * Message to update the status and set risk on the platform
 */
export interface UpdateOrderRisk extends MessageBase {
  /**
   * Collection of scoring assessments
   */
  fraudData: FraudAssessment[];
  /**
   * Risk: LOW, MEDIUM, HIGH
   */
  risk: Risk;
}
