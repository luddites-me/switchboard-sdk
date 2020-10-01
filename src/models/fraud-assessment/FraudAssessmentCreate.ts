import { IsEnum, IsOptional } from 'class-validator';
import { ProviderType } from './ProviderType';

export class FraudAssessmentCreate {
  public constructor(type: ProviderType) {
    this.type = type;
  }
  @IsEnum(ProviderType)
  type: ProviderType;

  @IsOptional()
  silent?: boolean;
}
