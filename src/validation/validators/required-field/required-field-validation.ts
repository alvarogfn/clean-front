import { RequiredFieldError } from "src/validation/errors/required-field-error";
import type { FieldValidation } from "src/validation/protocols/field-validation";

export class RequiredFieldValidation implements FieldValidation {
  constructor(public readonly field: string) {}
  validate(value: string): Error | null {
    return value ? null : new RequiredFieldError();
  }
}
