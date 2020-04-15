/* eslint-disable no-unused-expressions */
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { expect } from 'chai';
import sinon from 'sinon';
import 'mocha';
import { SwitchContext } from 'ns8-switchboard-interfaces';
import { QueueClient } from './QueueClient';
import { logger } from '../util';

const mockAccessToken = {
  id: '7a0ab6a3-615d-43ba-85b6-feb63a299097',
  expires: null,
  subjectId: 'f57d0ac9-2261-4dce-a58b-1f9cddc5a2a8',
  subjectType: 'MERCHANT',
};

const mockContext = ({
  apiBaseUrl: 'localhost',
  data: {
    status: 'CANCELLED',
    createdAt: '2032-04-08T05:19:03.212Z',
    updatedAt: '2033-04-08T05:24:05.447Z',
    id: 'ab0e6353-03bb-434d-a574-399c4b7422b7',
    merchantId: 'cf8a47f1-b41b-46a4-89a2-d1289469cfc5',
    verificationHistory: null,
    platformId: '00000000',
    name: '00000000',
    fraudAssessments: [
      {
        createdAt: '2023-04-08T05:19:04.467Z',
        updatedAt: null,
        id: '88e5cc74-1ca2-4583-83a6-6c13bbc6324d',
        providerType: 'EQ8',
        score: 999,
        grade: 'A',
      },
      {
        createdAt: '2030-04-08T05:19:04.467Z',
        updatedAt: null,
        id: '77e5cc74-1ca2-4583-83a6-6c13bbc6324d',
        providerType: 'MIN_FRAUD',
        score: 78,
        grade: null,
      },
    ],
  },
  merchant: {
    accessTokens: [mockAccessToken],
  },
} as unknown) as SwitchContext;

const mockContextWithoutScore = ({
  apiBaseUrl: 'localhost',
  data: {
    status: 'CANCELLED',
    createdAt: '2030-04-08T05:19:03.212Z',
    updatedAt: '2030-04-08T05:24:05.447Z',
    id: 'ab0e6333-03bb-434d-a574-399c4b7422b7',
    merchantId: 'cf6a47f1-b41b-46a4-89a2-d1289469cfc5',
    verificationHistory: null,
    platformId: '00000000',
    name: '00000000',
  },
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

    const client = new QueueClient(mockContext);

    expect(client.createUpdateEQ8ScoreEvent()).to.eventually.be.true;
  });

  it('uses the correct api url and endpoint', async () => {
    const fakePost = (url: string, _data: any, _config: AxiosRequestConfig): AxiosResponse => {
      expect(url).to.equal(`${mockApiUrl}/protect/eventqueue/create`);
      return mockResponseSuccess;
    };

    sinon.replace(axios, 'post', sinon.fake(fakePost));

    const client = new QueueClient(mockContext);

    expect(client.createUpdateOrderStatusEvent()).to.eventually.be.true;
  });

  it('returns true when successfully creating an event', () => {
    sinon.replace(axios, 'post', sinon.fake.resolves({ status: 200, data: { successful: true } }));

    const client = new QueueClient(mockContext);

    expect(client.createUpdateOrderRiskEvent()).to.eventually.be.true;
  });

  it('returns true when successfully creating an event without an NS8 Score', () => {
    sinon.replace(axios, 'post', sinon.fake.resolves({ status: 200, data: { successful: true } }));

    const client = new QueueClient(mockContextWithoutScore);

    expect(client.createUpdateOrderRiskEvent()).to.eventually.be.true;
  });

  it('returns false when failing to create an event', () => {
    sinon.replace(axios, 'post', sinon.fake.rejects('Test failure'));
    sinon.replace(logger, 'error', sinon.fake()); // Replacing so it doesn't write out a huge error message

    const client = new QueueClient(mockContext);

    expect(client.createUpdateOrderStatusEvent()).to.eventually.be.false;
  });

  it('throws if no access token is found for merchant', () => {
    sinon.replace(logger, 'error', sinon.fake()); // Replacing so it doesn't write out a huge error message

    const badContext = ({
      apiBaseUrl: 'localhost',
      data: {
        status: 'CANCELLED',
        createdAt: '2030-04-08T05:19:03.212Z',
        updatedAt: '2030-04-08T05:24:05.447Z',
        id: 'ab0e6333-03bb-434d-a574-399c4b7422b7',
        merchantId: 'cf6a47f1-b41b-46a4-89a2-d1289469cfc5',
        verificationHistory: null,
        platformId: '00000000',
        name: '00000000',
        fraudAssessments: [
          {
            createdAt: '2023-04-08T05:19:04.467Z',
            updatedAt: null,
            id: '88e5cc74-1ca2-4583-83a6-6c13bbc6324d',
            providerType: 'EQ8',
            score: 999,
            grade: 'A',
          },
          {
            createdAt: '2030-04-08T05:19:04.467Z',
            updatedAt: null,
            id: '77e5cc74-1ca2-4583-83a6-6c13bbc6324d',
            providerType: 'MIN_FRAUD',
            score: 78,
            grade: null,
          },
        ],
      },
      merchant: {
        accessTokens: [],
      },
    } as unknown) as SwitchContext;
    const client = new QueueClient(badContext);

    expect(client.createUpdateEQ8ScoreEvent()).to.eventually.be.rejected;
  });
});
