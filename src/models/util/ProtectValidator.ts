/** Be careful about adding code here, this file is copied into
 * switchboard-models repo and used there as well
 * */
import { validate, ValidationError } from 'class-validator';

export class ProtectValidator {
  /**
   * Determines whether an object meets its contractual obligations.
   * @param obj - instance of a class to validate
   */
  public static async isValid(obj: Object): Promise<boolean> {
    return (await ProtectValidator.getValidationErrors(obj)).length === 0;
  }

  /**
   * Retrieves all validation errors (if any) for an object.
   * @param obj - instance of a class to validate
   */
  public static async getValidationErrors(obj: Object): Promise<ValidationError[]> {
    let errors: ValidationError[] = [];
    try {
      errors = await validate(obj);
      for (const error of errors) {
        // doesn't use a logger because this is copied and used externally as well, see top comment
        console.log(error.toString());
      }
    } catch (e) {
      console.log(`Validation failed. ${e.message}`);
    }
    return errors;
  }
}
