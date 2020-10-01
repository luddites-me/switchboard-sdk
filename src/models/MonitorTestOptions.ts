import { IsString } from 'class-validator';

export class MonitorTestOptions {
  @IsString()
  readonly stationId!: string;
}
