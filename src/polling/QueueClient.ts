import axios from 'axios';
import { MessageBase, SwitchContext, SwitchEventType, UpdateOrderRisk } from 'ns8-switchboard-interfaces';
import { FraudAssessment, ProviderType } from 'ns8-protect-models';
import { logger } from '../util';

const CREATE_QUEUE_MESSAGE_ENDPOINT = '/protect/eventqueue/create';

/**
 * Used to create events on the queue.
 */
export class QueueClient {
  private readonly switchContext: SwitchContext;

  private readonly apiBaseUrl: string;

  /**
   * Creates a queue client.
   * @param switchContext - The current switch context.
   */
  public constructor(switchContext: SwitchContext) {
    this.switchContext = switchContext;
    this.apiBaseUrl = switchContext.apiBaseUrl.toString();
  }

  /**
   * Extracts the EQ8 score from the fraud assessment data, if available
   *
   * @private
   * @memberof QueueClient
   */
  private getEQ8Score = (): string => {
    const assessments: FraudAssessment[] | undefined = this.switchContext.data.fraudAssessments as FraudAssessment[];
    const eq8Match = assessments?.find((a) => a.providerType === ProviderType.EQ8);
    return eq8Match?.score?.toString() || '';
  };

  /**
   * Creates an update order status event on the queue.
   * @returns True if event was created successfully, false otherwise.
   */
  public createUpdateOrderStatusEvent = async (
    eventType: SwitchEventType = SwitchEventType.UPDATE_ORDER_STATUS,
  ): Promise<boolean> => {
    const eventDataMessage: UpdateOrderRisk = {
      action: eventType,
      fraudData: this.switchContext.data.fraudAssessments as FraudAssessment[],
      orderId: this.switchContext.data.name,
      // TODO: restore this when switchboard-interfaces is updated
      // platformStatus: this.switchContext.data.platformStatus,
      risk: this.switchContext.data.risk,
      score: this.getEQ8Score(),
      status: this.switchContext.data.status,
    };
    return this.createEvent(eventDataMessage);
  };

  /**
   * Creates an update EQ8 score event on the queue.
   * @returns True if event was created successfully, false otherwise.
   */
  public createUpdateEQ8ScoreEvent = async (): Promise<boolean> => {
    const eventDataMessage: MessageBase = {
      action: SwitchEventType.UPDATE_EQ8_SCORE,
      orderId: this.switchContext.data.name,
      score: this.getEQ8Score(),
      status: this.switchContext.data.status,
    };
    return this.createEvent(eventDataMessage);
  };

  /**
   * Creates an update order risk event on the queue.
   * @returns True if event was created successfully, false otherwise.
   */
  public createUpdateOrderRiskEvent = async (): Promise<boolean> =>
    this.createUpdateOrderStatusEvent(SwitchEventType.UPDATE_ORDER_RISK);

  /**
   * Executes the call to SQS to create the new message.
   *
   * @private
   * @memberof QueueClient
   * @returns True if event was created successfully, false otherwise.
   */
  private createEvent = async <T extends MessageBase>(message: T): Promise<boolean> => {
    const { merchant } = this.switchContext;
    const accessToken = merchant.accessTokens.find((token) => token.subjectType === 'MERCHANT');
    if (!accessToken) {
      throw new Error('No access token found for merchant');
    }

    try {
      const apiUrl = this.apiBaseUrl.replace(/\/$/, '');
      const response = await axios.post(`${apiUrl}${CREATE_QUEUE_MESSAGE_ENDPOINT}`, message, {
        headers: {
          Authorization: `Bearer ${accessToken.id}`,
        },
      });

      return response.status === 200 && response.data && !!response.data.successful;
    } catch (error) {
      logger.error('Failed to create queue event', error);
      return false;
    }
  };
}
