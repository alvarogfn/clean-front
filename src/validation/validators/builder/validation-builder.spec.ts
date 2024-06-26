import { ValidationBuilder } from "@/validation/validators/builder/validation-builder";
import { EmailValidation } from "@/validation/validators/email/email-validation";
import { MinLengthValidation } from "@/validation/validators/min-length/min-length-validation";
import { RequiredFieldValidation } from "@/validation/validators/required-field/required-field-validation";

describe("ValidationBuilder", () => {
  test("Should return RequiredFieldValidation", () => {
    const validations = ValidationBuilder.field("any_field").required().build();

    expect(validations).toEqual([new RequiredFieldValidation("any_field")]);
  });

  test("Should return EmailFieldValidation", () => {
    const validations = ValidationBuilder.field("any_field").email().build();

    expect(validations).toEqual([new EmailValidation("any_field")]);
  });

  test("Should return MinLengthValidation", () => {
    const validations = ValidationBuilder.field("any_field").min(5).build();

    expect(validations).toEqual([new MinLengthValidation("any_field", 5)]);
  });

  test("Should return a list of validations", () => {
    const validations = ValidationBuilder.field("any_field").required().min(5).email().build();

    expect(validations).toEqual([
      new RequiredFieldValidation("any_field"),
      new MinLengthValidation("any_field", 5),
      new EmailValidation("any_field"),
    ]);
  });
});
