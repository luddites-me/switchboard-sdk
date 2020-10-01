import { UninstallActionSwitch } from '..';
import { SwitchContext } from '..';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { AccessToken, Merchant } from '..';
import { URL } from 'url';
import { UninstallActionOperator } from '..';
import { V2Client } from '..';

describe('UninstallActionOperator', () => {
  const uninstallSwitch: UninstallActionSwitch = {
    uninstall: async (): Promise<any> => ({}),
  };
  const accessToken: AccessToken = new AccessToken();
  const merchant: Merchant = new Merchant();
  merchant.accessTokens = [accessToken];

  const switchContext: SwitchContext = new SwitchContext({
    merchant,
    data: {},
    apiBaseUrl: new URL('http://localhost'),
  });

  let switchUninstallSpy: sinon.SinonSpy;
  let v2Client: V2Client;

  before(() => {
    switchUninstallSpy = sinon.spy(uninstallSwitch, 'uninstall');
    v2Client = new V2Client();
    sinon.stub(v2Client, 'uninstall').resolves();
  });

  afterEach(() => {
    switchUninstallSpy.resetHistory();
  });

  it('runs multiple switches', async () => {
    const switches: UninstallActionSwitch[] = [uninstallSwitch, uninstallSwitch];
    const operator: UninstallActionOperator = new UninstallActionOperator(switches, v2Client);
    await operator.handle(switchContext);
    expect(switchUninstallSpy.getCalls().length).to.be.eq(2);
  });
});
