import { InvalidFieldError } from "@/validation/errors/invalid-field-error";
import { faker } from "@faker-js/faker";
import { EmailValidation } from "./email-validation";

const makeSut = () => {
  return new EmailValidation("email");
};

describe("EmailValidation", () => {
  test("Should return error if email is invalid", () => {
    const sut = makeSut();

    const error = sut.validate(faker.lorem.words());

    expect(error).toEqual(new InvalidFieldError("email"));
  });

  test("Should return falsy if email is valid", () => {
    const sut = makeSut();

    const error = sut.validate(faker.internet.email());

    expect(error).toBeFalsy();
  });

  test("Should return falsy if email is empty", () => {
    const sut = makeSut();

    const error = sut.validate(faker.internet.email());

    expect(error).toBeFalsy();
  });
});
