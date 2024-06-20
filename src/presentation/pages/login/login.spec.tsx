import type {Validation} from "@/presentation/protocols/validation";
import { faker } from "@faker-js/faker";
import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import {beforeEach, describe, expect, test} from "vitest";
import Login from "./login";


class ValidationStub implements Validation {
  public errorMessage: string | null = "";

  public validate(): string {
    return this.errorMessage as string;
  }
}

let user = userEvent.setup();

beforeEach(() => {
  user = userEvent.setup();
})

const makeSut = (params: {validationError: ''}) => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params.validationError;

  render(() => <Login validation={validationStub} />);

};

describe("Login Component", () => {
  test("should start with initial state", async () => {
    const validationError = faker.lorem.words();
    makeSut({ validationError });

    const errorWrap = screen.queryByTestId("spinner");
    expect(errorWrap).not.toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /entrar/i }) as HTMLButtonElement;
    expect(submitButton).toBeDisabled();

    const emailStatus = screen.getByTestId("email-status");
    expect(emailStatus).toHaveProperty("title", validationError);
    expect(emailStatus).toHaveTextContent("🔴");

    const passwordStatus = screen.getByTestId("password-status");
    expect(passwordStatus).toHaveProperty("title", validationError);
    expect(passwordStatus).toHaveTextContent("🔴");
  });

  test("should show email error if validate fails", async () => {
    const validationError = faker.lorem.words();
    makeSut({ validationError });

    const emailInput = screen.getByTestId("email");

    await user.type(emailInput, faker.internet.email());

    const emailStatus = screen.getByTestId("email-status");
    expect(emailStatus).toHaveProperty("title", validationError);
    expect(emailStatus).toHaveTextContent("🔴");
  });

  test("should show password error if validate fails", async () => {
    const validationError = faker.lorem.words();
    makeSut({ validationError });

    const passwordInput = screen.getByTestId("password");

    await user.type(passwordInput, faker.internet.password());

    const passwordStatus = screen.getByTestId("password-status");
    expect(passwordStatus).toHaveProperty("title", validationError);
    expect(passwordStatus).toHaveTextContent("🔴");
  });

  test("should show valid email state if validate succeeds", async () => {
    makeSut();

    const emailInput = screen.getByTestId("email");

    await user.type(emailInput, faker.internet.email());

    const emailStatus = screen.getByTestId("email-status");
    expect(emailStatus).toHaveProperty("title", 'Tudo Certo!');
    expect(emailStatus).toHaveTextContent("🟢");
  });

  test("should show valid password state if validate succeeds", async () => {
    makeSut();

    const passwordInput = screen.getByTestId("password");

    await user.type(passwordInput, faker.internet.password());

    const passwordStatus = screen.getByTestId("password-status");
    expect(passwordStatus).toHaveProperty("title", 'Tudo Certo!');
    expect(passwordStatus).toHaveTextContent("🟢");
  });


  test("should enable submit if form is valid", async () => {
    makeSut();


    const emailInput = screen.getByTestId("email");
    await user.type(emailInput, faker.internet.email());

    const passwordInput = screen.getByTestId("password");
    await user.type(passwordInput, faker.internet.password());

    const submitButton = screen.getByRole("button", { name: /entrar/i }) as HTMLButtonElement;
    expect(submitButton).toBeEnabled();
  });

  test("should show spinner on submit", async () => {
    makeSut();


    const emailInput = screen.getByTestId("email");
    await user.type(emailInput, faker.internet.email());

    const passwordInput = screen.getByTestId("password");
    await user.type(passwordInput, faker.internet.password());

    const submitButton = screen.getByRole("button", { name: /entrar/i }) as HTMLButtonElement;
    await user.click(submitButton);

    const spinner = screen.getByRole('progressbar');
    expect(spinner).toBeInTheDocument();
  });
});
