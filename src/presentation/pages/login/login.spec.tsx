import { ValidationStub } from "@/presentation/test/mock-validation";
import { faker } from "@faker-js/faker";
import { render, screen } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import Login from "./login";

const user = userEvent.setup();

const makeSut = () => {
  const validationSpy = new ValidationStub();
  validationSpy.errorMessage = faker.lorem.words();

  render(() => <Login validation={validationSpy} />);

  return { validationSpy };
};

describe("Login Component", () => {
  test("should start with initial state", async () => {
    const { validationSpy } = makeSut();

    const errorWrap = screen.queryByTestId("spinner");
    expect(errorWrap).not.toBeInTheDocument();

    const submitButton = screen.getByRole("button", { name: /entrar/i }) as HTMLButtonElement;
    expect(submitButton).toBeDisabled();

    const emailStatus = screen.getByTestId("email-status");
    expect(emailStatus).toHaveProperty("title", validationSpy.errorMessage);
    expect(emailStatus).toHaveTextContent("🔴");

    const passwordStatus = screen.getByTestId("password-status");
    expect(passwordStatus).toHaveProperty("title", validationSpy.errorMessage);
    expect(passwordStatus).toHaveTextContent("🔴");
  });

  test("should show email error if validate fails", async () => {
    const { validationSpy } = makeSut();

    const emailInput = screen.getByTestId("email");

    await user.type(emailInput, faker.internet.email());

    const emailStatus = screen.getByTestId("email-status");
    expect(emailStatus).toHaveProperty("title", validationSpy.errorMessage);
    expect(emailStatus).toHaveTextContent("🔴");
  });

  test("should show password error if validate fails", async () => {
    const { validationSpy } = makeSut();

    const passwordInput = screen.getByTestId("password");

    await user.type(passwordInput, faker.internet.password());

    const passwordStatus = screen.getByTestId("password-status");
    expect(passwordStatus).toHaveProperty("title", validationSpy.errorMessage);
    expect(passwordStatus).toHaveTextContent("🔴");
  });
});
