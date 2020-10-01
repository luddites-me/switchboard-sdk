import { IsBoolean } from 'class-validator';

export class StationPutOptions {
  @IsBoolean()
  enabled!: boolean;
}
