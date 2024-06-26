import type { Validation } from "@/presentation/protocols/validation";
import type { FieldValidation } from "@/validation/protocols/field-validation";

export class ValidationComposite implements Validation {
  private constructor(private readonly validators: FieldValidation[]) {}

  static build(validators: FieldValidation[]) {
    return new ValidationComposite(validators);
  }

  validate(fieldName: string, fieldValue: string): string {
    const validators = this.validators.filter((validator) => validator.field === fieldName);

    for (const validator of validators) {
      const error = validator.validate(fieldValue);

      if (error) {
        return error.message;
      }
    }

    return "";
  }
}
