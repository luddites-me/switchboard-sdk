import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { getCountryNameFromCountryCode } from './countryCode';

// Country Code tests
describe('country codes', () => {
  use(chaiAsPromised);

  it('converts "us" to "United States of America"', async () => {
    const input = 'us';
    const output = 'United States of America';
    const convert = getCountryNameFromCountryCode(input);
    expect(convert).to.equal(output);
  });

  it('converts "unknown" to an empty string', async () => {
    const input = 'unknown';
    const output = '';
    const convert = getCountryNameFromCountryCode(input);
    expect(convert).to.equal(output);
  });

  it('converts "" to an empty string', async () => {
    const output = '';
    const convert = getCountryNameFromCountryCode();
    expect(convert).to.equal(output);
  });
});
