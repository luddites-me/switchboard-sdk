/* eslint-disable no-unused-expressions */
import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { existsInEnum } from './existsInEnum';
import { Gender } from './Gender';

describe('enums', () => {
  use(chaiAsPromised);

  it('finds "M" in Gender', async () => {
    const exists = existsInEnum(Gender, 'M');
    expect(exists).to.be.true;
  });

  it('finds "m" case-insensitive in Gender', async () => {
    const exists = existsInEnum(Gender, 'm', true);
    expect(exists).to.be.true;
  });
});
