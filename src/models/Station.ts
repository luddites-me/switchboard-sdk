import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';

export class Station {
  @IsString()
  country!: string;

  @IsString()
  description!: string;

  @IsBoolean()
  enabled!: boolean;

  @IsNumber()
  id!: number;

  @IsNumber()
  latitude!: number;

  @IsNumber()
  longitude!: number;

  @IsBoolean()
  @IsOptional()
  scanner?: boolean;

  @IsString()
  url!: string;
}
