import { IsDate, IsNumberString, IsOptional, IsString } from 'class-validator';

export class OrderFindOptions {
  @IsOptional()
  @IsNumberString()
  ccBin?: number | string;

  @IsOptional()
  @IsNumberString()
  ccLastFour?: number | string;

  @IsOptional()
  @IsNumberString()
  amount?: number;

  @IsOptional()
  @IsString()
  currency?: string;

  @IsOptional()
  @IsDate()
  date?: Date;
}
