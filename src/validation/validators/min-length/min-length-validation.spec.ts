import { InvalidFieldError } from "@/validation/errors/invalid-field-error";
import { MinLengthValidation } from "@/validation/validators/min-length/min-length-validation";

const makeSut = () => {
  const fieldName = "field";
  const sut = new MinLengthValidation(fieldName, 5);
  return { fieldName, sut };
};

describe("MinLengthValidation", () => {
  test("Should return error if value is invalid", () => {
    const { fieldName, sut } = makeSut();

    const error = sut.validate("123");

    expect(error).toEqual(new InvalidFieldError(fieldName));
  });

  test("Should return falsy if value is valid", () => {
    const { sut } = makeSut();

    const error = sut.validate("12345");

    expect(error).toBeFalsy();
  });
});
