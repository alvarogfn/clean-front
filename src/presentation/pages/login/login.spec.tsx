import type { Validation } from "@/presentation/protocols/validation";
import { test, expect, describe } from "vitest";
import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import Login from "./login";

const user = userEvent.setup();

class ValidationSpy implements Validation {
  errorMessage: string;
  input: object;

  public validate(input: object): string {
    this.input = input;
    return this.errorMessage;
  }
}

const makeSut = () => {
  const validationSpy = new ValidationSpy();

  render(() => <Login validation={validationSpy} />);

  return { validationSpy };
};

describe("Login Component", () => {
  test("should start with initial state", async () => {
    makeSut();

    const errorWrap = screen.queryByTestId("spinner");
    expect(errorWrap).not.toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /entrar/i }) as HTMLButtonElement;
    expect(submitButton).toBeDisabled();

    const emailStatus = screen.getByTestId("email-status");
    expect(emailStatus).toHaveProperty("title", "Campo obrigatório");
    expect(emailStatus).toHaveTextContent("🔴");

    const passwordStatus = screen.getByTestId("password-status");
    expect(passwordStatus).toHaveProperty("title", "Campo obrigatório");
    expect(passwordStatus).toHaveTextContent("🔴");
  });

  test("should call validation with correct email", async () => {
    const { validationSpy } = makeSut();

    const emailInput = screen.getByTestId("email");

    await user.type(emailInput,  "any_email" );

    expect(validationSpy.input).toEqual({
      email: "any_email",
    });
  });

  test("should call validation with correct password", async () => {
    const { validationSpy } = makeSut();

    const passwordInput = screen.getByTestId("password");

    await user.type(passwordInput,  "any_password" );

    expect(validationSpy.input).toEqual({
      password: "any_password",
    });
  });
});
