import { IsBoolean } from 'class-validator';

export class MonitorPutOptions {
  @IsBoolean()
  enabled!: boolean;
}
