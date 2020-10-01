import { SwitchContext } from '../SwitchContext';

export interface UninstallActionSwitch {
  uninstall(switchContext: SwitchContext): Promise<void>;
}
