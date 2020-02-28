import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { getGender } from './gender';
import { Gender } from '../enums/Gender';

describe('customer tests', () => {
  use(chaiAsPromised);

  it('converts 0 to gender "U"', async () => {
    const input = 0;
    const output = Gender.UNKNOWN;
    const convert = getGender(input);
    expect(convert).to.equal(output);
  });

  it('converts 1 to gender "M"', async () => {
    const input = 1;
    const output = Gender.MALE;
    const convert = getGender(input);
    expect(convert).to.equal(output);
  });

  it('converts 2 to gender "F"', async () => {
    const input = 2;
    const output = Gender.FEMALE;
    const convert = getGender(input);
    expect(convert).to.equal(output);
  });

  it('converts 3 to gender "U"', async () => {
    const input = 3;
    const output = Gender.UNKNOWN;
    const convert = getGender(input);
    expect(convert).to.equal(output);
  });

  it('converts undefined to gender "U"', async () => {
    const output = Gender.UNKNOWN;
    const convert = getGender();
    expect(convert).to.equal(output);
  });
});
