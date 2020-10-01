import { ValidationError } from 'class-validator';

/**
 * Guarantees all models can be validated
 */
export interface IValidatable {
  /**
   * Returns true if object has any validation errors.
   */
  isValid(): Promise<boolean>;
  /**
   * Returns a collection of validation errors; if none, an empty array.
   */
  getValidationErrors(): Promise<ValidationError[]>;
}
