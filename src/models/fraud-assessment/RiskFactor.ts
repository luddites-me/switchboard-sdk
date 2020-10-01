import { TextProvider } from '../text-utils/TextProvider';
import { FraudAssessment } from './FraudAssessment';
import { RiskFactorCategory } from './RiskFactorCategory';
import { RiskFactorType } from './RiskFactorType';


export class RiskFactor {
  constructor(riskFactor: Partial<RiskFactor>) {
    Object.assign(this, riskFactor || {});
  }

  id!: string;


  type!: RiskFactorType;


  category: RiskFactorCategory = RiskFactorCategory.DEFAULT;

  description?: string;



  populateDescription(): void {
    this.description = TextProvider.getRiskFactorDescription(this.type, this.category);
  }


  private fraudAssessment!: FraudAssessment;

}
