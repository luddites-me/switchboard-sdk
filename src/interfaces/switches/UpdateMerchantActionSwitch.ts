import { SwitchContext } from '../SwitchContext';

export interface UpdateMerchantActionSwitch {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  update(switchContext: SwitchContext): Promise<any>;
}
