import { Status } from 'ns8-protect-models';
import { testSdkEnumConversion } from '@ns8/protect-tools-js';

import { stringToProtectStatus } from './toOrderStatus';

/**
 * Describes how Order Status data sets should look for test assertions
 * @internal
 */
interface OrderStatusAssertion {
  input?: string;
  assert: Status;
}

/**
 * Assertions to test for Order Status data logic
 * @internal
 */
export const tests: OrderStatusAssertion[] = [
  {
    input: 'approval',
    assert: Status.APPROVED,
  },
  {
    input: 'approved',
    assert: Status.APPROVED,
  },
  {
    input: 'approve',
    assert: Status.APPROVED,
  },
  {
    input: 'cancel',
    assert: Status.CANCELLED,
  },
  {
    input: 'canceled',
    assert: Status.CANCELLED,
  },
  {
    input: 'cancelled',
    assert: Status.CANCELLED,
  },
  {
    input: 'merchantreview',
    assert: Status.MERCHANT_REVIEW,
  },
  {
    input: 'review',
    assert: Status.MERCHANT_REVIEW,
  },
  {
    input: 'pending',
    assert: Status.MERCHANT_REVIEW,
  },
  {
    input: '',
    assert: Status.MERCHANT_REVIEW,
  },
  {
    assert: Status.MERCHANT_REVIEW,
  },
];

testSdkEnumConversion({
  conversionFunction: async (input) => stringToProtectStatus(input),
  targetEnum: 'Status',
  tests,
});
