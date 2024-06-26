import { faker } from "@faker-js/faker";
import { RequiredFieldError } from "src/validation/errors/required-field-error";
import { RequiredFieldValidation } from "src/validation/validators/required-field/required-field-validation";

const makeSut = () => new RequiredFieldValidation(faker.database.column());

describe("RequiredFieldValidation", () => {
  test("should return error if field is empty", () => {
    const sut = makeSut();

    const error = sut.validate("");

    expect(error).toEqual(new RequiredFieldError());
  });

  test("should return falsy if field is not empty", () => {
    const sut = new RequiredFieldValidation("email");

    const error = sut.validate(faker.lorem.words());

    expect(error).toBeFalsy();
  });
});
