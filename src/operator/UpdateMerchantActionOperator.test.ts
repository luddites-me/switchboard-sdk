import { UpdateMerchantActionSwitch } from '..';
import { SwitchContext } from '..';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { AccessToken, Merchant } from '..';
import { URL } from 'url';
import { UpdateMerchantActionOperator } from '..';
import { V2Client } from '..';

describe('UpdateMerchantActionOperator', () => {
  const okSwitch: UpdateMerchantActionSwitch = {
    update: async (): Promise<any> => ({ merchant: {} }),
  };
  const ignoreSwitch: UpdateMerchantActionSwitch = {
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
    sinon.stub(v2Client, 'updateMerchant').resolves(new Merchant());
  });
  afterEach(() => {
    okSwitchCreateSpy.resetHistory();
    ignoreSwitchCreateSpy.resetHistory();
  });

  it('runs multiple switches', async () => {
    const switches: UpdateMerchantActionSwitch[] = [okSwitch, okSwitch];
    const operator: UpdateMerchantActionOperator = new UpdateMerchantActionOperator(switches, v2Client);
    await operator.handle(switchContext);
    expect(okSwitchCreateSpy.getCalls().length).to.be.eq(2);
  });

  it('only runs once if first switch does not return a merchant', async () => {
    const switches: UpdateMerchantActionSwitch[] = [ignoreSwitch, okSwitch];
    const operator: UpdateMerchantActionOperator = new UpdateMerchantActionOperator(switches, v2Client);
    await operator.handle(switchContext);
    expect(ignoreSwitchCreateSpy.getCalls().length).to.be.eq(1);
    expect(okSwitchCreateSpy.getCalls().length).to.be.eq(0);
  });
});
