import { MerchantUpdate } from '..';
import { UpdateMerchantActionSwitch, SwitchContext } from '..';
import { URL } from 'url';
import { V2Client } from './V2Client';
import { SwitchContextDecorator } from './SwitchContextDecorator';
import { Operator } from './Operator';

export class UpdateMerchantActionOperator implements Operator {
  public constructor(private readonly updateMerchantActionSwitches: UpdateMerchantActionSwitch[] = [],
                     private readonly v2Client: V2Client = new V2Client(),
                     private readonly switchContextDecorator: SwitchContextDecorator = new SwitchContextDecorator()) {
  }

  public handle = async (event: SwitchContext): Promise<MerchantUpdate | undefined> => {
    const switchContext: SwitchContext = await this.switchContextDecorator.decorate(event);
    let hasValidMerchant = true;
    let switchIndex = 0;

    while (switchIndex < this.updateMerchantActionSwitches.length && hasValidMerchant) {
      switchContext.data = await this.updateMerchantActionSwitches[switchIndex].update(switchContext);
      hasValidMerchant = switchContext.data || false;
      switchIndex += 1;
    }

    if (hasValidMerchant) {
      const v2BaseUrl: URL = switchContext.apiBaseUrl;
      const v2Token: string = switchContext.merchant.accessTokens[0].id;

      return this.v2Client.withAuthToken(v2Token)
        .withBaseUrl(v2BaseUrl)
        .updateMerchant(switchContext.data);
    }
    return undefined;
  };
}
