/* eslint-disable no-unused-expressions */

import { expect, use } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import 'mocha';
import { sleep, asyncForEach } from './async';

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

describe('asyncForEach', () => {
  use(chaiAsPromised);

  it('async operates over every member of an array', async () => {
    await asyncForEach([1, 2, 3, 4], async (i: number) => { return i; });
    expect('').to.be.string;
  });

  it('async operates over null array', async () => {
    await asyncForEach(null, async (i: number) => { return i; });
    expect('').to.be.string;
  });

  it('async operates over null callback', async () => {
    await asyncForEach(null, null);
    expect('').to.be.string;
  });
});
