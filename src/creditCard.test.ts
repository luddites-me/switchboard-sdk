import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { CreditCardTransactionType } from 'ns8-protect-models';
import { stringToCreditCardTransactionType } from './creditCard';

// Credit Card tests
describe('credit cards', () => {
  use(chaiAsPromised);

  it('converts "authorization" to an CreditCardTransactionType', async () => {
    const input = 'authorization';
    const output = CreditCardTransactionType.AUTHORIZATION;
    const convert = stringToCreditCardTransactionType(input);
    expect(convert).to.equal(output);
  });

  it('converts "capture" to an CreditCardTransactionType', async () => {
    const input = 'capture';
    const output = CreditCardTransactionType.CAPTURE;
    const convert = stringToCreditCardTransactionType(input);
    expect(convert).to.equal(output);
  });

  it('converts "refund" to an CreditCardTransactionType', async () => {
    const input = 'refund';
    const output = CreditCardTransactionType.REFUND;
    const convert = stringToCreditCardTransactionType(input);
    expect(convert).to.equal(output);
  });

  it('converts "sale" to an CreditCardTransactionType', async () => {
    const input = 'sale';
    const output = CreditCardTransactionType.SALE;
    const convert = stringToCreditCardTransactionType(input);
    expect(convert).to.equal(output);
  });

  it('converts "order" to an CreditCardTransactionType', async () => {
    const input = 'order';
    const output = CreditCardTransactionType.SALE;
    const convert = stringToCreditCardTransactionType(input);
    expect(convert).to.equal(output);
  });

  it('converts "void" to an CreditCardTransactionType', async () => {
    const input = 'void';
    const output = CreditCardTransactionType.VOID;
    const convert = stringToCreditCardTransactionType(input);
    expect(convert).to.equal(output);
  });

  it('converts "unknown" to an CreditCardTransactionType', async () => {
    const input = 'unknown';
    const output = CreditCardTransactionType.AUTHORIZATION;
    const convert = stringToCreditCardTransactionType(input);
    expect(convert).to.equal(output);
  });
});
