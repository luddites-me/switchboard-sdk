/* eslint-disable no-unused-expressions */

import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { sleep } from './sleep';

// Sleep tests
describe('sleep', () => {
  use(chaiAsPromised);

  it('sleeps for 10ms', async () => {
    await sleep(10);
    expect('').to.be.string;
  });

  it('sleeps for default ms', async () => {
    await sleep();
    expect('').to.be.string;
  });
});
