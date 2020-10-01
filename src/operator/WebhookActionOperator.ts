import { WebhookActionSwitch, SwitchContext } from '..';
import { SwitchContextDecorator } from './SwitchContextDecorator';
import { Operator } from './Operator';

export class WebhookActionOperator implements Operator {
  public constructor(private readonly webhookActionSwitches: WebhookActionSwitch[] = [],
                     private readonly switchContextDecorator: SwitchContextDecorator = new SwitchContextDecorator()) {
  }

  public handle = async (event: SwitchContext): Promise<void> => {
    let switchContext: SwitchContext = await this.switchContextDecorator.decorate(event);
    switchContext = new SwitchContext(switchContext);

    const webhookActionSwitchHandles = this.webhookActionSwitches.map(
      (webhookActionSwitch) => webhookActionSwitch.handle(switchContext),
    );

    await Promise.all(webhookActionSwitchHandles);
  };
}
