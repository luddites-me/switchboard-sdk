import { Order } from '../..';
import { SwitchContext } from '../SwitchContext';

export interface CreateOrderActionSwitch {
  create(switchContext: SwitchContext): Promise<Order>;
}
