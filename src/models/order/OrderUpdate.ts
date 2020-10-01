import { IsEnum, IsOptional, IsString, MaxLength } from 'class-validator';
import { Status } from './Status';

export class OrderUpdate {

  constructor(partial?: Partial<OrderUpdate>) {
    Object.assign(this, partial || {});
  }

  @IsOptional()
  @IsEnum(Status)
  status!: Status;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  platformStatus!: string;
}
