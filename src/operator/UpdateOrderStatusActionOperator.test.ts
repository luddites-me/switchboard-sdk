import { UpdateOrderStatusActionSwitch } from '..';
import { SwitchContext } from '..';
import { expect } from 'chai';
import * as sinon from 'sinon';
import {
  AccessToken,
  Merchant,
  Order,
  OrderUpdate,
} from '..';
import { URL } from 'url';
import { UpdateOrderStatusActionOperator } from '..';
import { V2Client } from '..';

describe('UpdateOrderStatusActionOperator', () => {
  const okSwitch: UpdateOrderStatusActionSwitch = {
    update: async (): Promise<any> => ({ orderStatus: {} }),
  };
  const ignoreSwitch: UpdateOrderStatusActionSwitch = {
    update: async (): Promise<any> => undefined,
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
  let v2Client: V2Client;

  before(() => {
    okSwitchCreateSpy = sinon.spy(okSwitch, 'update');
    ignoreSwitchCreateSpy = sinon.spy(ignoreSwitch, 'update');
    v2Client = new V2Client();
    sinon.stub(v2Client, 'getOrderByName').resolves(new Order());
    sinon.stub(v2Client, 'updateOrderStatus').resolves(new OrderUpdate());
  });
  afterEach(() => {
    okSwitchCreateSpy.resetHistory();
    ignoreSwitchCreateSpy.resetHistory();
  });

  it('runs multiple switches', async () => {
    const switches: UpdateOrderStatusActionSwitch[] = [okSwitch, okSwitch];
    const operator: UpdateOrderStatusActionOperator = new UpdateOrderStatusActionOperator(switches, v2Client);
    await operator.handle(switchContext);
    expect(okSwitchCreateSpy.getCalls().length).to.be.eq(2);
  });

  it('only runs once if first switch does not return orderStatus data', async () => {
    const switches: UpdateOrderStatusActionSwitch[] = [ignoreSwitch, okSwitch];
    const operator: UpdateOrderStatusActionOperator = new UpdateOrderStatusActionOperator(switches, v2Client);
    await operator.handle(switchContext);
    expect(ignoreSwitchCreateSpy.getCalls().length).to.be.eq(1);
    expect(okSwitchCreateSpy.getCalls().length).to.be.eq(0);
  });
});
