import { IsDate, IsOptional, IsString } from 'class-validator';

export class ExtensionEventListOptions {
  @IsOptional()
  @IsDate()
  createdBefore?: Date;

  @IsOptional()
  @IsDate()
  createdAfter?: Date;

  @IsOptional()
  @IsString()
  merchantId?: string;

  @IsOptional()
  @IsString()
  extensionId?: string;

  @IsOptional()
  @IsString()
  pageToken?: string;
}
