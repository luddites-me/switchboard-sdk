import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { TransactionMethod } from 'ns8-protect-models';
import { stringToTransactionMethod } from './transactionMethod';

// Transaction Method tests
describe('transaction methods', () => {
  use(chaiAsPromised);

  it('converts "bankwire" to an TransactionMethod', async () => {
    const input = 'bankwire';
    const output = TransactionMethod.BANK_WIRE;
    const convert = stringToTransactionMethod(input);
    expect(convert).to.equal(output);
  });

  it('converts "cc" to an TransactionMethod', async () => {
    const input = 'cc';
    const output = TransactionMethod.CC;
    const convert = stringToTransactionMethod(input);
    expect(convert).to.equal(output);
  });

  it('converts "creditcard" to an TransactionMethod', async () => {
    const input = 'creditcard';
    const output = TransactionMethod.CC;
    const convert = stringToTransactionMethod(input);
    expect(convert).to.equal(output);
  });

  it('converts "check" to an TransactionMethod', async () => {
    const input = 'check';
    const output = TransactionMethod.CHECK;
    const convert = stringToTransactionMethod(input);
    expect(convert).to.equal(output);
  });

  it('converts "checkmo" to an TransactionMethod', async () => {
    const input = 'checkmo';
    const output = TransactionMethod.CHECK;
    const convert = stringToTransactionMethod(input);
    expect(convert).to.equal(output);
  });

  it('converts "cod" to an TransactionMethod', async () => {
    const input = 'cod';
    const output = TransactionMethod.COD;
    const convert = stringToTransactionMethod(input);
    expect(convert).to.equal(output);
  });

  it('converts "cashondelivery" to an TransactionMethod', async () => {
    const input = 'cashondelivery';
    const output = TransactionMethod.COD;
    const convert = stringToTransactionMethod(input);
    expect(convert).to.equal(output);
  });

  it('converts "moneyorder" to an TransactionMethod', async () => {
    const input = 'moneyorder';
    const output = TransactionMethod.COD;
    const convert = stringToTransactionMethod(input);
    expect(convert).to.equal(output);
  });

  it('converts "other" to an TransactionMethod', async () => {
    const input = 'other';
    const output = TransactionMethod.OTHER;
    const convert = stringToTransactionMethod(input);
    expect(convert).to.equal(output);
  });

  it('converts "unknown" to an TransactionMethod', async () => {
    const input = 'unknown';
    const output = TransactionMethod.OTHER;
    const convert = stringToTransactionMethod(input);
    expect(convert).to.equal(output);
  });
});
