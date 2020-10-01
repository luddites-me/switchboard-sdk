import { IsDate, IsOptional } from 'class-validator';

export class ExtensionItemListOptions {
  @IsOptional()
  @IsDate()
  startDate?: Date;

  @IsOptional()
  @IsDate()
  endDate?: Date;
}
