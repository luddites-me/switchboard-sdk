import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { Status } from 'ns8-protect-models';
import { stringToProtectStatus } from './toOrderStatus';

interface OrderStatusAssertion {
  input?: string;
  output: Status;
}

export const tests: OrderStatusAssertion[] = [
  {
    input: 'approval',
    output: Status.APPROVED,
  },
  {
    input: 'approved',
    output: Status.APPROVED,
  },
  {
    input: 'approve',
    output: Status.APPROVED,
  },
  {
    input: 'cancel',
    output: Status.CANCELLED,
  },
  {
    input: 'canceled',
    output: Status.CANCELLED,
  },
  {
    input: 'cancelled',
    output: Status.CANCELLED,
  },
  {
    input: 'merchantreview',
    output: Status.MERCHANT_REVIEW,
  },
  {
    input: 'review',
    output: Status.MERCHANT_REVIEW,
  },
  {
    input: 'pending',
    output: Status.MERCHANT_REVIEW,
  },
  {
    input: '',
    output: Status.MERCHANT_REVIEW,
  },
  {
    output: Status.MERCHANT_REVIEW,
  },
];

describe('order status suite', () => {
  use(chaiAsPromised);
  tests.forEach((test) => {
    it(`converts "${test.input}" to Status.${test.output.toUpperCase()}`, () => {
      const convert = stringToProtectStatus(test.input);
      expect(convert).to.equal(test.output);
    });
  });
});
