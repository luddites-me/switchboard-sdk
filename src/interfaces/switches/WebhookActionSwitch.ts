import { SwitchContext } from '../SwitchContext';

export interface WebhookActionSwitch {
  handle(switchContext: SwitchContext): Promise<void>;
}
