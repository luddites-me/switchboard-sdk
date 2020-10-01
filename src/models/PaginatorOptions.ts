import { IsOptional, IsString } from 'class-validator';

export class PaginatorOptions {
  @IsOptional()
  @IsString()
  pageToken?: string;
}
