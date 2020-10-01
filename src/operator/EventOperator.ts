import { EventSwitch, SwitchContext } from '..';
import { SwitchContextDecorator } from './SwitchContextDecorator';
import { Operator } from './Operator';

export class EventOperator implements Operator {
  public constructor(private readonly switches: EventSwitch[] = [],
                     private readonly switchContextDecorator: SwitchContextDecorator = new SwitchContextDecorator()) {
  }

  public handle = async (event: SwitchContext): Promise<SwitchContext | undefined> => {
    let switchContext: SwitchContext = await this.switchContextDecorator.decorate(event);
    switchContext = new SwitchContext(switchContext);

    let hasValidData = true;
    let switchIndex = 0;
    while (switchIndex < this.switches.length && hasValidData) {
      const eventSwitch: EventSwitch = this.switches[switchIndex];
      switchContext.data = await eventSwitch.handle(switchContext);
      hasValidData = switchContext.data || false;
      switchIndex += 1;
    }

    if (hasValidData) {
      return switchContext;
    }
    return undefined;
  };
}
