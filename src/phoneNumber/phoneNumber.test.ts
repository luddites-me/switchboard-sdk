import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { formatPhoneNumber } from './phoneNumber';

// Phone Number tests
describe('phone numbers', () => {
  use(chaiAsPromised);

  it('converts "(216) 208-0460" to "+12162080460" as "US"', async () => {
    const input = '(216) 208-0460';
    const output = '+12162080460';
    const convert = formatPhoneNumber(input, 'us');
    expect(convert).to.equal(output);
  });

  it('converts "(216) 208-0460" to "+12162080460"', async () => {
    const input = '(216) 208-0460';
    const convert = formatPhoneNumber(input);
    expect(convert).to.equal(input);
  });

  it('converts "020 7183 8750" to "020 7183 8750" as "UK"', async () => {
    const input = '020 7183 8750';
    const output = '020 7183 8750';
    const convert = formatPhoneNumber(input, 'uk');
    expect(convert).to.equal(output);
  });

  it('converts "" to ""', async () => {
    const output = '';
    const convert = formatPhoneNumber();
    expect(convert).to.equal(output);
  });
});
