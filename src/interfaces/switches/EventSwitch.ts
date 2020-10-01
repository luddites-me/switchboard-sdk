import { SwitchContext } from '../SwitchContext';

export interface EventSwitch {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handle(switchContext: SwitchContext): Promise<any>;
}
