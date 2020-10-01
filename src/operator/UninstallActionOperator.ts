import { UninstallActionSwitch, SwitchContext } from '..';
import { URL } from 'url';
import { V2Client } from './V2Client';
import { SwitchContextDecorator } from './SwitchContextDecorator';
import { Operator } from './Operator';

export class UninstallActionOperator implements Operator {
  public constructor(private readonly uninstallActionSwitches: UninstallActionSwitch[] = [],
                     private readonly v2Client: V2Client = new V2Client(),
                     private readonly switchContextDecorator: SwitchContextDecorator = new SwitchContextDecorator()) {
  }

  public handle = async (event: SwitchContext): Promise<void> => {
    const switchContext: SwitchContext = await this.switchContextDecorator.decorate(event);

    const uninstallActions = this.uninstallActionSwitches.map(
      (uninstallActionSwitch) => uninstallActionSwitch.uninstall(switchContext),
    );

    await Promise.all(uninstallActions);

    const v2BaseUrl: URL = switchContext.apiBaseUrl;
    const v2Token: string = switchContext.merchant.accessTokens[0].id;

    return this.v2Client.withAuthToken(v2Token)
      .withBaseUrl(v2BaseUrl)
      .uninstall();
  };
}
