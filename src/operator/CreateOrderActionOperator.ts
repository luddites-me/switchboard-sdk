import { CreateOrderActionSwitch, SwitchContext } from '..';
import { URL } from 'url';
import { FraudAssessmentCreate, Order, ProviderType } from '..';
import { V2Client } from './V2Client';
import { SwitchContextDecorator } from './SwitchContextDecorator';
import { Operator } from './Operator';
import { ApiError } from './ApiError';

export class CreateOrderActionOperator implements Operator {
  public constructor(private readonly createOrderActionSwitches: CreateOrderActionSwitch[] = [],
                     private readonly v2Client: V2Client = new V2Client(),
                     private readonly switchContextDecorator: SwitchContextDecorator = new SwitchContextDecorator()) {
  }

  public handle = async (event: SwitchContext): Promise<Order> => {
    const switchContext: SwitchContext = await this.switchContextDecorator.decorate(event);
    let hasValidOrder = true;
    let switchIndex = 0;
    while (switchIndex < this.createOrderActionSwitches.length && hasValidOrder) {
      switchContext.data = await this.createOrderActionSwitches[switchIndex].create(switchContext);
      hasValidOrder = switchContext.data && switchContext.data !== null;
      switchIndex += 1;
    }

    if (hasValidOrder) {
      const v2BaseUrl: URL = switchContext.apiBaseUrl;
      const v2Token: string = switchContext.merchant.accessTokens[0].id;
      const order = await this.postOrderAndHandleDuplicate(v2BaseUrl, v2Token, switchContext);

      if (!order) {
        return new Order();
      }

      await this.v2Client.withAuthToken(v2Token)
        .withBaseUrl(v2BaseUrl)
        .postFraudAssessment(new FraudAssessmentCreate(ProviderType.EQ8), order.id);
      return order;
    }
    return new Order();
  };

  /*
   * A 409 response when we first attempt to save an order is incredibly common.
   * This is because we trigger the CreateOrderAction switch based on a transaction
   * webhook firing from Shopify. If a single order has 4 transactions, we are
   * likely to receive a notification for each (4x).
   *
   * However, we also encounter a circumstance where the initial POST to create the order
   * succeeds, but the subsequent call to score the order fails. In this case, the
   * retry will always fail because it will attempt to re-insert the order before scoring
   * and be met with a 409. The logic below is meant to account for this scenario.
   */
  private async postOrderAndHandleDuplicate(
    v2BaseUrl: URL,
    v2Token: string,
    switchContext: SwitchContext,
  ): Promise<Order | undefined> {
    try {
      // Attempt to post and return the new order
      return await this.v2Client
        .withAuthToken(v2Token)
        .withBaseUrl(v2BaseUrl)
        .postOrder(switchContext.data);
    } catch (err) {
      // Check if it's a 409 error. If so, begin retry logic. If not, rethrow.
      if (!this.isDuplicateError(err)) {
        throw err;
      }

      // Try and get the order by name
      const order: Order = await this.v2Client.withAuthToken(v2Token)
        .withBaseUrl(v2BaseUrl)
        .getOrderByName(switchContext.data.name);

      // If there is no order and we're in the 409 catch, something has gone wrong. Throw.
      if (!order) {
        const formattedOrder: string = switchContext.data && typeof switchContext.data === 'object'
          ? `\nPOST Order Data: ${JSON.stringify(switchContext.data, undefined, 2)}`
          : '';
        const message = 'Unable to retrieve order associated with 409 by name.';
        throw new Error(`${message} Order Name: ${switchContext.data.name}${formattedOrder}`);
      }

      // Check for an existing EQ8 Assessment on the order.
      const existingEq8Assessment = (order.fraudAssessments != null && Array.isArray(order.fraudAssessments))
        ? order.fraudAssessments.find((assessment) => (assessment.providerType === ProviderType.EQ8))
        : undefined;

      // If an EQ8 fraud assessment exists then we should not score again. Return `undefined` to exit flow.
      // Otherwise, return the order so a fraud assessment can be run in the next step using order.id.
      return !existingEq8Assessment ? order : undefined;
    }
  }

  private isDuplicateError(err: ApiError): boolean {
    return err.status === 409;
  }
}
