import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { TransactionStatus } from 'ns8-protect-models';
import { stringToTransactionStatus } from './transactionStatus';

// Transaction Status tests
describe('transaction statuses', () => {
  use(chaiAsPromised);

  it('converts "error" to an TransactionStatus', async () => {
    const input = 'error';
    const output = TransactionStatus.ERROR;
    const convert = stringToTransactionStatus(input);
    expect(convert).to.equal(output);
  });

  it('converts "failure" to an TransactionStatus', async () => {
    const input = 'failure';
    const output = TransactionStatus.FAILURE;
    const convert = stringToTransactionStatus(input);
    expect(convert).to.equal(output);
  });

  it('converts "failed" to an TransactionStatus', async () => {
    const input = 'failed';
    const output = TransactionStatus.FAILURE;
    const convert = stringToTransactionStatus(input);
    expect(convert).to.equal(output);
  });

  it('converts "pending" to an TransactionStatus', async () => {
    const input = 'pending';
    const output = TransactionStatus.PENDING;
    const convert = stringToTransactionStatus(input);
    expect(convert).to.equal(output);
  });

  it('converts "processing" to an TransactionStatus', async () => {
    const input = 'processing';
    const output = TransactionStatus.PENDING;
    const convert = stringToTransactionStatus(input);
    expect(convert).to.equal(output);
  });

  it('converts "success" to an TransactionStatus', async () => {
    const input = 'success';
    const output = TransactionStatus.SUCCESS;
    const convert = stringToTransactionStatus(input);
    expect(convert).to.equal(output);
  });

  it('converts "successful" to an TransactionStatus', async () => {
    const input = 'successful';
    const output = TransactionStatus.SUCCESS;
    const convert = stringToTransactionStatus(input);
    expect(convert).to.equal(output);
  });

  it('converts "unknown" to an TransactionStatus', async () => {
    const input = 'unknown';
    const output = TransactionStatus.PENDING;
    const convert = stringToTransactionStatus(input);
    expect(convert).to.equal(output);
  });
});
