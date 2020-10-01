import * as sinon from 'sinon';
import { AccessToken, Merchant } from '..';
import { EventOperator } from '..';
import { EventSwitch } from '..';
import { expect } from 'chai';
import { SwitchContext } from '..';
import { URL } from 'url';

describe('EventOperatorTest', () => {
  const okSwitch: EventSwitch = {
    handle: async (): Promise<any> => ({ customerVerification: {} }),
  };
  const ignoreSwitch: EventSwitch = {
    handle: async (): Promise<any> => undefined,
  };

  const accessToken: AccessToken = new AccessToken();
  const merchant: Merchant = new Merchant();

  merchant.accessTokens = [accessToken];

  const switchContext: SwitchContext = new SwitchContext({
    merchant,
    data: {},
    apiBaseUrl: new URL('http://localhost'),
  });

  let okSwitchCreateSpy: sinon.SinonSpy;
  let ignoreSwitchCreateSpy: sinon.SinonSpy;

  before(() => {
    okSwitchCreateSpy = sinon.spy(okSwitch, 'handle');
    ignoreSwitchCreateSpy = sinon.spy(ignoreSwitch, 'handle');
  });

  afterEach(() => {
    okSwitchCreateSpy.resetHistory();
    ignoreSwitchCreateSpy.resetHistory();
  });

  it('runs multiple switches', async () => {
    const switches: EventSwitch[] = [okSwitch, okSwitch];
    const operator: EventOperator = new EventOperator(switches);
    await operator.handle(switchContext);
    expect(okSwitchCreateSpy.getCalls().length).to.be.eq(2);
  });

  it('only runs once if first switch does not assign data to switchContext', async () => {
    const switches: EventSwitch[] = [ignoreSwitch, okSwitch];
    const operator: EventOperator = new EventOperator(switches);
    await operator.handle(switchContext);
    expect(ignoreSwitchCreateSpy.getCalls().length).to.be.eq(1);
    expect(okSwitchCreateSpy.getCalls().length).to.be.eq(0);
  });
});
