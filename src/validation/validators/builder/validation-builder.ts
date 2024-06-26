import type { FieldValidation } from "@/validation/protocols/field-validation";
import { EmailValidation } from "@/validation/validators/email/email-validation";
import { MinLengthValidation } from "@/validation/validators/min-length/min-length-validation";
import { RequiredFieldValidation } from "@/validation/validators/required-field/required-field-validation";

export class ValidationBuilder {
  private constructor(
    private readonly fieldName: string,
    private readonly validations: FieldValidation[] = [],
  ) {}

  static field(fieldName: string): ValidationBuilder {
    return new ValidationBuilder(fieldName);
  }

  required(): ValidationBuilder {
    this.validations.push(new RequiredFieldValidation(this.fieldName));
    return this;
  }

  email(): ValidationBuilder {
    this.validations.push(new EmailValidation(this.fieldName));
    return this;
  }

  min(value: number) {
    this.validations.push(new MinLengthValidation(this.fieldName, value));
    return this;
  }

  build(): FieldValidation[] {
    return this.validations;
  }
}
