import { makeLoginValidation } from "@/main/factories/pages/login/login-validation-factory";
import { ValidationBuilder } from "@/validation/validators/builder/validation-builder";
import { ValidationComposite } from "@/validation/validators/validation-composite/validation-composite";

describe("LoginValidationFactory", () => {
  test("Should make compose ValidationComposite with correct validations", () => {
    const composite = makeLoginValidation();

    expect(composite).toEqual(
      ValidationComposite.build([
        ...ValidationBuilder.field("email").required().email().build(),
        ...ValidationBuilder.field("password").required().min(5).build(),
      ]),
    );
  });
});
