/* eslint-disable no-unused-expressions, @typescript-eslint/no-empty-function */

import * as fastify from 'fastify';
import {
  FraudAssessment,
  FraudAssessmentCreate,
  Merchant,
  Order,
  OrderUpdate,
  ProviderType,
  RiskFactor,
  Status,
} from '..';
import { expect } from 'chai';
import { URL } from 'url';
import { Response } from 'superagent';
import { V2Client } from '..';

describe('V2Client', () => {
  let server: fastify.FastifyInstance;
  const baseUrl = new URL('http://0.0.0.0:3000/protect');

  describe('postOrder', () => {
    const order = {
      platformId: 'platformOrderId',
      name: 'Order #1010',
      currency: 'USD',
      totalPrice: 1000.00,
      customer: {
        firstName: 'Valid',
        lastName: 'Customer',
        email: 'valid.customer@example.com',
      },
    } as Order;

    describe('success path', () => {
      before('before', async () => {
        server = fastify();
        server.post('/protect/orders', (request, reply) => {
          reply.code(200).send(request.body);
        });
        await server.listen(3000);
      });

      after('after', () => {
        server.close();
      });

      it('returns expected order', async () => {
        const v2Client = new V2Client()
          .withBaseUrl(baseUrl)
          .withAuthToken('v2Token');
        const newOrder = await v2Client.postOrder(order);
        expect(newOrder).to.be.deep.equal(order);
      });
    });

    describe('exception path', () => {
      before('before', async () => {
        server = fastify();
        server.post('/protect/orders', (request, reply) => {
          reply.code(422).send({ message: 'details' });
        });
        await server.listen(3000);
      });

      after('after', () => {
        server.close();
      });

      it('throws exception', async () => {
        const v2Client = new V2Client()
          .withBaseUrl(baseUrl)
          .withAuthToken('v2Token');
        await expect(v2Client.postOrder(order)).to.eventually.be.rejected.then((error) => {
          const resp: Response = error.response;
          expect(resp).to.exist;
          expect(resp.status).to.equal(422);
          expect(JSON.parse(resp.text)).to.deep.equal({ message: 'details' });
        });
      });
    });
  });

  describe('postFraudAssessment', async () => {
    const assessments: FraudAssessment[] = [
      new FraudAssessment({
        providerType: ProviderType.EQ8,
        factors: [
          new RiskFactor({}),
        ],
      }),
    ];
    before('before', async () => {
      server = fastify();
      server.post('/protect/orders/:id/fraud-assessments', (request, reply) => {
        reply.code(200).send(assessments);
      });
      await server.listen(3000);
    });

    after('after', () => {
      server.close();
    });

    it('returns expected FraudAssessment', async () => {
      const v2Client = new V2Client()
        .withBaseUrl(baseUrl)
        .withAuthToken('v2Token');
      const result: FraudAssessment[] = await v2Client.postFraudAssessment(
        new FraudAssessmentCreate(ProviderType.EQ8),
        'id',
      );

      expect(result).to.have.length(1);
      expect(result[0]).to.be.eql(assessments[0]);
    });
  });

  describe('updateMerchant', () => {
    const merchant: Merchant = new Merchant();

    before('before', async () => {
      server = fastify();
      server.patch('/protect/merchants/current', (request, reply) => {
        reply.code(200).send(merchant);
      });
      await server.listen(3000);
    });

    after('after', () => {
      server.close();
    });

    it('returns expected merchant', async () => {
      const v2Client = new V2Client()
        .withBaseUrl(baseUrl)
        .withAuthToken('v2Token');
      const updatedMerchant = await v2Client.updateMerchant(merchant);
      expect(updatedMerchant).to.be.deep.equal(merchant);
    });
  });

  describe('uninstall', () => {
    before('before', async () => {
      server = fastify();
      server.delete('/protect/merchants/current', (request, reply) => {
        reply.code(204).send();
      });
      await server.listen(3000);
    });

    after('after', () => {
      server.close();
    });

    it('succeeds', async () => {
      const v2Client = new V2Client()
        .withBaseUrl(baseUrl)
        .withAuthToken('v2Token');

      const response = await v2Client.uninstall();
      expect(response).to.not.exist;
    });
  });

  describe('getOrderByName', async () => {
    const order = new Order({ id: '#1234' });

    before('before', async () => {
      server = fastify();
      server.get('/protect/orders/order-name/:orderName', (request, reply) => {
        reply.code(200).send(order);
      });
      await server.listen(3000);
    });

    after('after', () => {
      server.close();
    });

    it('returns expected order', async () => {
      const v2Client: V2Client = new V2Client()
        .withBaseUrl(baseUrl)
        .withAuthToken('v2Token');
      const foundOrder: Order = await v2Client.getOrderByName('#1234');

      expect(order).to.be.deep.equal(foundOrder);
    });
  });

  describe('updateOrderStatus', async () => {
    const orderUpdate: OrderUpdate = new OrderUpdate({ status: Status.CANCELLED, platformStatus: 'cancelled' });

    before('before', async () => {
      server = fastify();
      server.put('/protect/orders/:id', (request, reply) => {
        reply.code(200).send(orderUpdate);
      });
      await server.listen(3000);
    });

    after('after', () => {
      server.close();
    });

    it('returns expected order', async () => {
      const v2Client: V2Client = new V2Client()
        .withBaseUrl(baseUrl)
        .withAuthToken('v2Token');

      const newOrderUpdate: OrderUpdate = await v2Client.updateOrderStatus('#1234', orderUpdate);
      expect(newOrderUpdate.status).to.be.eq(Status.CANCELLED);
      expect(newOrderUpdate.platformStatus).to.be.equals('cancelled');
    });
  });
});
