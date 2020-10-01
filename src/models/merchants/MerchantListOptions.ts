import { IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { IntegrationPlatformType } from '../IntegrationPlatformType';
import { PaginatorOptions } from '../PaginatorOptions';

export class MerchantListOptions extends PaginatorOptions {

  @IsOptional()
  @IsString()
  orderBy?: string;

  @IsOptional()
  @IsDate()
  createdBefore?: Date;

  @IsOptional()
  @IsDate()
  createdAfter?: Date;

  @IsOptional()
  @IsDate()
  updatedBefore?: Date;

  @IsOptional()
  @IsDate()
  updatedAfter?: Date;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  platformId?: string;

  @IsOptional()
  @IsString()
  domain?: string;

  @IsOptional()
  @IsString()
  storefrontUrl?: string;

  @IsOptional()
  @IsString()
  integrationPlatformType?: IntegrationPlatformType;
}
