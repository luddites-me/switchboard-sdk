/* eslint-disable no-unused-expressions */

import { S3 } from 'aws-sdk';
import * as sinon from 'sinon';
import { DataType, SwitchContext } from '..';
import { expect } from 'chai';
import { SwitchContextDecorator } from '..';

describe('SwitchContextDecorator', () => {
  const s3: S3 = new S3();
  let getObjectStub: sinon.SinonStub;

  before(() => {
    getObjectStub = sinon.stub(s3, 'getObject');
    getObjectStub.returns({ promise: () => Promise.resolve({ Body: JSON.stringify({}) }) });
  });

  afterEach(() => {
    getObjectStub.resetHistory();
  });

  after(() => {
    getObjectStub.restore();
  });

  it('Does not call s3 for local type', async () => {
    const decorator: SwitchContextDecorator = new SwitchContextDecorator(s3);
    const switchContext: SwitchContext = await decorator.decorate({
      type: DataType.LOCAL,
    } as SwitchContext);
    expect(getObjectStub.called).to.be.false;
    expect(switchContext).is.a.instanceof(SwitchContext);
  });

  it('Does not call s3 with no type', async () => {
    const decorator: SwitchContextDecorator = new SwitchContextDecorator(s3);
    await decorator.decorate({} as SwitchContext);
    expect(getObjectStub.called).to.be.false;
  });

  it('Calls s3 for s3 type', async () => {
    const decorator: SwitchContextDecorator = new SwitchContextDecorator(s3);
    const switchContext: SwitchContext = await decorator.decorate({
      type: DataType.S3,
      s3Location: {
        bucketName: 'bucket',
        key: 'key',
      },
    } as SwitchContext);
    expect(getObjectStub.calledOnce).to.be.true;
    expect(getObjectStub.getCall(0).args).to.be.eql([{ Bucket: 'bucket', Key: 'key' }]);
    expect(switchContext).is.a.instanceof(SwitchContext);
  });
});
