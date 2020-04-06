import axios from 'axios';

import { MessageBase, UpdateEQ8Score, UpdateOrderStatus, UpdateOrderRisk } from '../message';
import { logger, env } from '../util';

/**
 * Used to create events on the queue.
 */
export class QueueClient {
  /**
   * Creates a queue client.
   * @param apiUrl - Base URL of the API, defaults to `NS8_CLIENT_URL` from .env file.
   */
  public constructor(public readonly apiUrl: string = env.NS8_CLIENT_URL) {}

  /**
   * Creates an update order status event on the queue.
   * @param updateOrderStatus - Data payload to attach to event.
   * @return True if event was created successfully, false otherwise.
   */
  public createUpdateOrderStatusEvent = (updateOrderStatus: UpdateOrderStatus) => this.createEvent(updateOrderStatus);

  /**
   * Creates an update EQ8 score event on the queue.
   * @param updateEQ8Score - Data payload to attach to event.
   * @return True if event was created successfully, false otherwise.
   */
  public createUpdateEQ8ScoreEvent = (updateEQ8Score: UpdateEQ8Score) => this.createEvent(updateEQ8Score);

  /**
   * Creates an update order risk event on the queue.
   * @param updateOrderRisk - Data payload to attach to event.
   * @return True if event was created successfully, false otherwise.
   */
  public createUpdateOrderRiskEvent = (updateOrderRisk: UpdateOrderRisk) => this.createEvent(updateOrderRisk);

  private createEvent = async <T extends MessageBase>(message: T): Promise<boolean> => {
    try {
      const res = await axios({
        method: 'post',
        url: `${this.apiUrl}/api/polling/createQueueMessage`,
        data: message,
      });

      return res.status === 200 && res.data && !!res.data.successful;
    } catch (error) {
      logger.error('Failed to create queue event', error);
      return false;
    }
  };
}
