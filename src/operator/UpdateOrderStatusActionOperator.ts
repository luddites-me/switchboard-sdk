import { UpdateOrderStatusActionSwitch, SwitchContext, NamedOrderUpdate } from '..';
import { Order, OrderUpdate } from '..';
import { URL } from 'url';
import { V2Client } from './V2Client';
import { SwitchContextDecorator } from './SwitchContextDecorator';
import { Operator } from './Operator';

export class UpdateOrderStatusActionOperator implements Operator {
  public constructor(private readonly updateOrderStatusActionSwitches: UpdateOrderStatusActionSwitch[] = [],
                     private readonly v2Client: V2Client = new V2Client(),
                     private readonly switchContextDecorator: SwitchContextDecorator = new SwitchContextDecorator()) {
  }

  public handle = async (event: SwitchContext): Promise<OrderUpdate> => {
    const switchContext: SwitchContext = await this.switchContextDecorator.decorate(event);
    let hasValidStatusUpdate = true;
    let switchIndex = 0;

    while (switchIndex < this.updateOrderStatusActionSwitches.length && hasValidStatusUpdate) {
      switchContext.data = await this.updateOrderStatusActionSwitches[switchIndex].update(switchContext);
      hasValidStatusUpdate = switchContext.data;
      switchIndex += 1;
    }

    if (hasValidStatusUpdate) {
      const v2BaseUrl: URL = switchContext.apiBaseUrl;
      const v2Token: string = switchContext.merchant.accessTokens[0].id;
      const namedOrderUpdate: NamedOrderUpdate = switchContext.data;

      const order: Order = await this.v2Client.withAuthToken(v2Token)
        .withBaseUrl(v2BaseUrl)
        .getOrderByName(namedOrderUpdate.orderName);

      const orderUpdate: OrderUpdate = new OrderUpdate({
        status: namedOrderUpdate.status,
        platformStatus: namedOrderUpdate.platformStatus,
      });

      return this.v2Client.withAuthToken(v2Token)
        .withBaseUrl(v2BaseUrl)
        .updateOrderStatus(order.id, orderUpdate);
    }
    return new OrderUpdate();
  };
}
