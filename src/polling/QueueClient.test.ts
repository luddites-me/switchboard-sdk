/* eslint-disable no-unused-expressions */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import 'mocha';
import { SwitchContext } from 'ns8-switchboard-interfaces';

import { UpdateEQ8Score, UpdateOrderRisk, UpdateOrderStatus } from '../message';
import { QueueClient } from './QueueClient';
import { logger } from '../util';

const mockAccessToken = {
  id: '7a0ab6a3-615d-43ba-85b6-feb63a299097',
  expires: null,
  subjectId: 'f57d0ac9-2261-4dce-a58b-1f9cddc5a2a8',
  subjectType: 'MERCHANT',
};

const mockContext = ({
  merchant: {
    accessTokens: [mockAccessToken],
  },
} as unknown) as SwitchContext;

const mockApiUrl = 'localhost';

const mockResponseSuccess: AxiosResponse = {
  status: 200,
  data: { successful: true },
  statusText: 'OK',
  headers: {},
  config: {},
};

describe('queue client', () => {
  afterEach(() => sinon.restore());

  it('attaches access token to authorization header', async () => {
    const fakePost = (_url: string, _data: any, config: AxiosRequestConfig): AxiosResponse => {
      expect(config.headers.Authorization).to.equal(`Bearer ${mockAccessToken.id}`);
      return mockResponseSuccess;
    };

    sinon.replace(axios, 'post', sinon.fake(fakePost));

    const client = new QueueClient(mockContext, mockApiUrl);

    expect(client.createUpdateOrderStatusEvent({} as UpdateOrderStatus)).to.eventually.be.true;
  });

  it('uses the correct api url and endpoint', async () => {
    const fakePost = (url: string, _data: any, _config: AxiosRequestConfig): AxiosResponse => {
      expect(url).to.equal(`${mockApiUrl}/api/polling/createQueueMessage`);
      return mockResponseSuccess;
    };

    sinon.replace(axios, 'post', sinon.fake(fakePost));

    const client = new QueueClient(mockContext, mockApiUrl);

    expect(client.createUpdateOrderStatusEvent({} as UpdateOrderStatus)).to.eventually.be.true;
  });

  it('returns true when successfully creating an event', () => {
    sinon.replace(axios, 'post', sinon.fake.resolves({ status: 200, data: { successful: true } }));

    const client = new QueueClient(mockContext, mockApiUrl);

    expect(client.createUpdateOrderRiskEvent({} as UpdateOrderRisk)).to.eventually.be.true;
  });

  it('returns false when failing to create an event', () => {
    sinon.replace(axios, 'post', sinon.fake.rejects('Test failure'));
    sinon.replace(logger, 'error', sinon.fake()); // Replacing so it doesn't write out a huge error message

    const client = new QueueClient(mockContext, mockApiUrl);

    expect(client.createUpdateOrderStatusEvent({} as UpdateOrderStatus)).to.eventually.be.false;
  });

  it('throws if no access token is found for merchant', () => {
    sinon.replace(logger, 'error', sinon.fake()); // Replacing so it doesn't write out a huge error message

    const badContext = ({ merchant: { accessTokens: [] } } as unknown) as SwitchContext;
    const client = new QueueClient(badContext, mockApiUrl);

    expect(client.createUpdateEQ8ScoreEvent({} as UpdateEQ8Score)).to.eventually.be.rejected;
  });
});
