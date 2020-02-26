import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { formatPhoneNumber } from './phoneNumber';

// Phone Number tests
describe('phone numbers', () => {
  use(chaiAsPromised);

  it('converts "(216) 208-0460" to "+12162080460"', async () => {
    const input = '(216) 208-0460';
    const output = '+12162080460';
    const convert = formatPhoneNumber(input, 'us');
    expect(convert).to.equal(output);
  });

  // Foreign numbers not working yet
  // it('converts "020 7183 8750" to "+442071838750"', async () => {
  //   const input = '020 7183 8750';
  //   const output = '+442071838750';
  //   const convert = formatPhoneNumber(input, 'uk');
  //   expect(convert).to.equal(output);
  // });
});
