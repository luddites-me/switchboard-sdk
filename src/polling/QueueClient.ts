import axios from 'axios';
import { MessageBase, UpdateEQ8Score, UpdateOrderRisk, UpdateOrderStatus, SwitchContext } from 'ns8-switchboard-interfaces';
import { logger } from '../util';

const CREATE_QUEUE_MESSAGE_ENDPOINT = 'api/polling/createQueueMessage';

/**
 * Used to create events on the queue.
 */
export class QueueClient {
  private readonly switchContext: SwitchContext;

  private readonly apiBaseUrl: string;

  /**
   * Creates a queue client.
   * @param switchContext - The current switch context.
   * @param apiBaseUrl - The base API url.
   */
  public constructor(switchContext: SwitchContext, apiBaseUrl: string) {
    this.switchContext = switchContext;
    this.apiBaseUrl = apiBaseUrl;
  }

  /**
   * Creates an update order status event on the queue.
   * @param updateOrderStatus - Data payload to attach to event.
   * @returns True if event was created successfully, false otherwise.
   */
  public createUpdateOrderStatusEvent = (updateOrderStatus: UpdateOrderStatus): Promise<boolean> =>
    this.createEvent(updateOrderStatus);

  /**
   * Creates an update EQ8 score event on the queue.
   * @param updateEQ8Score - Data payload to attach to event.
   * @returns True if event was created successfully, false otherwise.
   */
  public createUpdateEQ8ScoreEvent = (updateEQ8Score: UpdateEQ8Score): Promise<boolean> =>
    this.createEvent(updateEQ8Score);

  /**
   * Creates an update order risk event on the queue.
   * @param updateOrderRisk - Data payload to attach to event.
   * @returns True if event was created successfully, false otherwise.
   */
  public createUpdateOrderRiskEvent = (updateOrderRisk: UpdateOrderRisk): Promise<boolean> =>
    this.createEvent(updateOrderRisk);

  private createEvent = async <T extends MessageBase>(message: T): Promise<boolean> => {
    console.log('ding dong ding!!!!!!')
    const { merchant } = this.switchContext;
    const accessToken = merchant.accessTokens.find((token) => token.subjectType === 'MERCHANT');
    if (!accessToken) {
      throw new Error('No access token found for merchant');
    }

    try {
      const response = await axios.post(`${this.apiBaseUrl}/${CREATE_QUEUE_MESSAGE_ENDPOINT}`, message, {
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
