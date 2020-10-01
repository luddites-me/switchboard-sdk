import { DataType, SwitchContext } from '..';
import { S3 } from 'aws-sdk';
import { GetObjectOutput } from 'aws-sdk/clients/s3';

export class SwitchContextDecorator {
  public constructor(private readonly s3Client?: S3) {
    if (!s3Client) {
      this.s3Client = new S3();
    }
  }

  public decorate = async (context: SwitchContext): Promise<SwitchContext> => {
    if (DataType.S3 === context.type) {
      const getObjectOutput = await this.s3Client?.getObject({
        Bucket: context.s3Location?.bucketName || '',
        Key: context.s3Location?.key || '',
      }).promise();
      const contextFromS3: SwitchContext = JSON.parse(getObjectOutput?.Body?.toString() || '{}');
      return new SwitchContext(contextFromS3);
    }
    return new SwitchContext(context);
  };
}
