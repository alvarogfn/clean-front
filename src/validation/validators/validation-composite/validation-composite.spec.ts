import { FieldValidationSpy } from "@/validation/validators/test/mock-field-validation";
import { ValidationComposite } from "@/validation/validators/validation-composite/validation-composite";

const makeSut = () => {
  const fieldValidationsSpy = [new FieldValidationSpy("any_field"), new FieldValidationSpy("any_field")];

  const sut = ValidationComposite.build(fieldValidationsSpy);

  return { sut, fieldValidationsSpy };
};

describe("ValidationComposite", () => {
  test("Should return first error if all validation fails", () => {
    const { sut, fieldValidationsSpy } = makeSut();

    fieldValidationsSpy[0].error = new Error("any_message_1");
    fieldValidationsSpy[1].error = new Error("any_message_2");

    const error = sut.validate("any_field", "any_value");

    expect(error).toBe("any_message_1");
  });

  test("should return error", () => {
    const { sut } = makeSut();
    const error = sut.validate("any_field", "any_value");
    expect(error).toBeFalsy();
  });
});
