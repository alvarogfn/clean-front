import { InvalidFieldError } from "@/validation/errors/invalid-field-error";
import type { FieldValidation } from "@/validation/protocols/field-validation";

export class MinLengthValidation implements FieldValidation {
  constructor(
    public readonly field: string,
    private readonly minLength: number,
  ) {}

  validate(value: string): Error | null {
    if (value.length >= this.minLength) return null;

    return new InvalidFieldError(this.field);
  }
}
