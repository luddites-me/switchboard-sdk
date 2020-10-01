import { CreateOrderActionSwitch, SwitchContext } from '..';
import {
  Order,
  Merchant,
  AccessToken,
  FraudAssessment,
  ProviderType,
} from '..';
import * as chai from 'chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as sinon from 'sinon';
import { URL } from 'url';
import { Response } from 'superagent';
import { CreateOrderActionOperator } from '..';
import { V2Client } from '..';
import { ApiError } from '..';

chai.use(chaiAsPromised);
const { expect } = chai;

function getMockMerchant(): Merchant {
  const accessToken: AccessToken = new AccessToken();
  const merchant: Merchant = new Merchant();
  merchant.accessTokens = [accessToken];
  return merchant;
}

function getMockSwitchContext(merchant: Merchant): SwitchContext {
  return new SwitchContext({
    merchant,
    data: {},
    apiBaseUrl: new URL('http://localhost'),
  });
}

function getMockOrder(orderParams?: Partial<Order>, withFraudAssessment?: boolean): Order {
  const mockOrder = orderParams ? new Order(orderParams) : new Order();
  if (withFraudAssessment) {
    mockOrder.fraudAssessments = [new FraudAssessment({ providerType: ProviderType.EQ8 })];
  }
  return mockOrder;
}

function getResponse(statusCode: number): Response {
  return { status: statusCode } as Response;
}

describe('CreateOrderActionOperator', () => {
  const okSwitch: CreateOrderActionSwitch = {
    create: async (): Promise<Order> => new Order(),
  };
  const ignoreSwitch: CreateOrderActionSwitch = {
    create: async (): Promise<Order> => undefined,
  };

  const duplicateError: ApiError = new ApiError({}, getResponse(409), { message: 'Duplicate Entry' });
  const merchant: Merchant = getMockMerchant();
  const switchContext: SwitchContext = getMockSwitchContext(merchant);

  let okSwitchCreateSpy: sinon.SinonSpy;
  let ignoreSwitchCreateSpy: sinon.SinonSpy;
  let v2Client: V2Client;

  before(() => {
    okSwitchCreateSpy = sinon.spy(okSwitch, 'create');
    ignoreSwitchCreateSpy = sinon.spy(ignoreSwitch, 'create');
  });

  afterEach(() => {
    okSwitchCreateSpy.resetHistory();
    ignoreSwitchCreateSpy.resetHistory();
  });

  describe('basic switch execution', () => {
    let mockOrder: Order;

    before(() => {
      v2Client = new V2Client();
      mockOrder = new Order({ id: '1111222233334444555566667777888899' });
      sinon.stub(v2Client, 'postOrder').resolves(mockOrder);
      sinon.stub(v2Client, 'postFraudAssessment').resolves([new FraudAssessment()]);
    });

    it('runs multiple switches', async () => {
      const switches: CreateOrderActionSwitch[] = [okSwitch, okSwitch];
      const operator: CreateOrderActionOperator = new CreateOrderActionOperator(switches, v2Client);
      await operator.handle(switchContext);
      expect(okSwitchCreateSpy.getCalls().length).to.be.eq(2);
    });

    it('only runs once if first switch does not return an order', async () => {
      const switches: CreateOrderActionSwitch[] = [ignoreSwitch, okSwitch];
      const operator: CreateOrderActionOperator = new CreateOrderActionOperator(switches, v2Client);
      await operator.handle(switchContext);
      expect(ignoreSwitchCreateSpy.getCalls().length).to.be.eq(1);
      expect(okSwitchCreateSpy.getCalls().length).to.be.eq(0);
    });

    it('returns an copy of the saved order after a ::postOrder call', async () => {
      const switches: CreateOrderActionSwitch[] = [okSwitch];
      const operator: CreateOrderActionOperator = new CreateOrderActionOperator(switches, v2Client);
      const operatorResult = await operator.handle(switchContext);
      expect(operatorResult).to.be.eq(mockOrder);
    });
  });

  describe('::postOrderAndHandleDuplicate - successful retry', () => {
    let mockOrderNoFraud: Order;

    before(() => {
      mockOrderNoFraud = getMockOrder(undefined, false);
      v2Client = new V2Client();
      sinon.stub(v2Client, 'postOrder').rejects(duplicateError);
      sinon.stub(v2Client, 'getOrderByName').resolves(mockOrderNoFraud);
      sinon.stub(v2Client, 'postFraudAssessment').resolves([new FraudAssessment()]);
    });

    it('returns a copy of the order when retry finds an existing order with no EQ8 fraud assessment', async () => {
      const switches: CreateOrderActionSwitch[] = [okSwitch];
      const operator: CreateOrderActionOperator = new CreateOrderActionOperator(switches, v2Client);
      const operatorResult = await operator.handle(switchContext);
      expect(operatorResult).to.be.eq(mockOrderNoFraud);
    });
  });

  describe('::postOrderAndHandleDuplicate - known exit cases', () => {
    let mockOrder: Order;

    before(() => {
      mockOrder = getMockOrder(undefined, true);
      v2Client = new V2Client();
      sinon.stub(v2Client, 'postOrder').rejects(duplicateError);
      sinon.stub(v2Client, 'getOrderByName').resolves(mockOrder);
    });

    it('only runs once if we receive an error on order save & there is an existing EQ8 fraud assessment', async () => {
      const switches: CreateOrderActionSwitch[] = [okSwitch];
      const operator: CreateOrderActionOperator = new CreateOrderActionOperator(switches, v2Client);
      await operator.handle(switchContext);
      expect(okSwitchCreateSpy.getCalls().length).to.be.eq(1);
    });

    it('returns undefined when the retry finds an order with an existing EQ8 fraud assessment', async () => {
      const switches: CreateOrderActionSwitch[] = [okSwitch];
      const operator: CreateOrderActionOperator = new CreateOrderActionOperator(switches, v2Client);
      const operatorResult = await operator.handle(switchContext);
      expect(operatorResult).to.be.eq(undefined);
    });

    it('returns undefined when provided no switchContext.data', async () => {
      const switches: CreateOrderActionSwitch[] = [okSwitch];
      const operator: CreateOrderActionOperator = new CreateOrderActionOperator(switches, v2Client);
      const badContext = { ...switchContext };
      badContext.data = undefined;
      const operatorResult = await operator.handle(switchContext);
      expect(operatorResult).to.be.eq(undefined);
    });
  });

  describe('::postOrderAndHandleDuplicate - throwing', () => {
    before(() => {
      v2Client = new V2Client();
      sinon.stub(v2Client, 'postOrder').rejects(duplicateError);
      sinon.stub(v2Client, 'getOrderByName').resolves(undefined);
    });

    it('throws when we cannot find an order by name on 409 retry', async () => {
      const switches: CreateOrderActionSwitch[] = [okSwitch];
      const operator: CreateOrderActionOperator = new CreateOrderActionOperator(switches, v2Client);
      await expect(operator.handle(switchContext))
        .to.eventually.be.rejectedWith('Unable to retrieve order associated with 409 by name. Order Name: undefined');
    });
  });

  describe('::postOrderAndHandleDuplicate - non 409 error', () => {
    let notFoundError: ApiError;
    before(() => {
      v2Client = new V2Client();
      notFoundError = new ApiError({}, getResponse(404), { message: 'Not Found' });
      sinon.stub(v2Client, 'postOrder').rejects(notFoundError);
      sinon.stub(v2Client, 'getOrderByName').resolves(undefined);
    });

    it('rethrows the error if it is not a 409', async () => {
      const switches: CreateOrderActionSwitch[] = [okSwitch];
      const operator: CreateOrderActionOperator = new CreateOrderActionOperator(switches, v2Client);
      await expect(operator.handle(switchContext)).to.eventually.be.rejectedWith(notFoundError);
    });
  });

  describe('::isDuplicateError', () => {
    let operator: CreateOrderActionOperator;
    before(() => {
      v2Client = new V2Client();
      const switches: CreateOrderActionSwitch[] = [okSwitch];
      operator = new CreateOrderActionOperator(switches, v2Client);
    });

    it('basic tests', () => {
      let error = new ApiError({}, getResponse(409), {});
      // eslint-disable-next-line dot-notation
      expect(operator['isDuplicateError'](error)).to.equal(true);

      error = new ApiError({}, getResponse(410), {});
      // eslint-disable-next-line dot-notation
      expect(operator['isDuplicateError'](error)).to.equal(false);

      error = new ApiError({}, getResponse(410), { joe: 'mama' });
      // eslint-disable-next-line dot-notation
      expect(operator['isDuplicateError'](error)).to.equal(false);
    });
  });
});
