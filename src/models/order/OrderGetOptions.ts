import { IsOptional, IsString } from 'class-validator';

export class OrderGetOptions {
  @IsOptional()
  @IsString()
  readonly platformCustomerId?: string;
}
