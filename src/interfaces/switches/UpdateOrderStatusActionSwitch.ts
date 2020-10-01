import { SwitchContext } from '../SwitchContext';
import { NamedOrderUpdate } from '../NamedOrderUpdate';

export interface UpdateOrderStatusActionSwitch {
  update(switchContext: SwitchContext): Promise<NamedOrderUpdate>;
}
