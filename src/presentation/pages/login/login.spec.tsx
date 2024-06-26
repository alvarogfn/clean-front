import { InvalidCredentialsError } from "@/domain/errors/invalid-credentials-error";
import { AuthenticationSpy } from "@/presentation/mock/mock-authentication";
import { ValidationStub } from "@/presentation/mock/mock-validation";
import { faker } from "@faker-js/faker";
import { MemoryRouter, Route, createMemoryHistory } from "@solidjs/router";
import { fireEvent, render, screen, waitFor } from "@solidjs/testing-library";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, test } from "vitest";
import Login from "./login";
import "vitest-localstorage-mock";

let user = userEvent.setup();

beforeEach(() => {
  user = userEvent.setup();
});

const history = createMemoryHistory();

const makeSut = (params = { validationError: "" }) => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params.validationError;

  const authenticationSpy = new AuthenticationSpy();

  render(() => (
    <MemoryRouter history={history}>
      <Route path="/" component={() => <Login validation={validationStub} authentication={authenticationSpy} />} />
    </MemoryRouter>
  ));

  return { authenticationSpy };
};

async function simulateValidSubmit({
  email = faker.internet.email(),
  password = faker.internet.password(),
}: { email?: string; password?: string }) {
  const emailInput = screen.getByTestId("email") as HTMLInputElement;
  await user.type(emailInput, email);

  const passwordInput = screen.getByTestId("password") as HTMLInputElement;
  await user.type(passwordInput, password);

  const submitButton = screen.getByRole("button", { name: /entrar/i }) as HTMLButtonElement;
  await user.click(submitButton);
  return { emailInput, passwordInput };
}

async function populateEmailField({ email = faker.internet.email() }) {
  const emailInput = screen.getByTestId("email");
  await user.type(emailInput, email);
}

async function populatePasswordField({ password = faker.internet.password() }) {
  const passwordInput = screen.getByTestId("password");
  await user.type(passwordInput, password);
}

beforeEach(() => {
  localStorage.clear();
});

window.scrollTo = vi.fn<unknown[]>();

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

    await populateEmailField({});

    const emailStatus = screen.getByTestId("email-status");
    expect(emailStatus).toHaveProperty("title", validationError);
    expect(emailStatus).toHaveTextContent("🔴");
  });

  test("should show password error if validate fails", async () => {
    const validationError = faker.lorem.words();
    makeSut({ validationError });

    await populatePasswordField({});

    const passwordStatus = screen.getByTestId("password-status");
    expect(passwordStatus).toHaveProperty("title", validationError);
    expect(passwordStatus).toHaveTextContent("🔴");
  });

  test("should show valid email state if validate succeeds", async () => {
    makeSut();

    await populateEmailField({});

    const emailStatus = screen.getByTestId("email-status");
    expect(emailStatus).toHaveProperty("title", "Tudo Certo!");
    expect(emailStatus).toHaveTextContent("🟢");
  });

  test("should show valid password state if validate succeeds", async () => {
    makeSut();

    await populatePasswordField({});

    const passwordStatus = screen.getByTestId("password-status");
    expect(passwordStatus).toHaveProperty("title", "Tudo Certo!");
    expect(passwordStatus).toHaveTextContent("🟢");
  });

  test("should enable submit if form is valid", async () => {
    makeSut();

    await populateEmailField({});
    await populatePasswordField({});

    const submitButton = screen.getByRole("button", { name: /entrar/i }) as HTMLButtonElement;
    expect(submitButton).toBeEnabled();
  });

  test("should show spinner on submit", async () => {
    makeSut();

    await simulateValidSubmit({});

    const spinner = screen.getByRole("progressbar");
    expect(spinner).toBeInTheDocument();
  });

  test("should call Authentication with correct values", async () => {
    const { authenticationSpy } = makeSut();

    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit({ email, password });

    expect(authenticationSpy.params).toEqual({
      email: email,
      password: password,
    });
  });

  test("should call Authentication only once", async () => {
    const { authenticationSpy } = makeSut();

    const authSpy = vi.spyOn(authenticationSpy, "auth");

    await simulateValidSubmit({});
    await simulateValidSubmit({});

    expect(authSpy).toHaveBeenCalledTimes(1);
  });

  test("should not call Authentication if form is invalid", async () => {
    const validationError = faker.lorem.words();

    const { authenticationSpy } = makeSut({ validationError: validationError });

    const authSpy = vi.spyOn(authenticationSpy, "auth");

    await populateEmailField({});

    const form = screen.getByRole("form");
    fireEvent.submit(form);

    expect(authSpy).toHaveBeenCalledTimes(0);
  });

  test("should present error if Authentication fails", async () => {
    const { authenticationSpy } = makeSut();

    const authSpy = vi.spyOn(authenticationSpy, "auth");

    const invalidCredentialsError = new InvalidCredentialsError();

    authSpy.mockRejectedValueOnce(invalidCredentialsError);

    await simulateValidSubmit({});

    const mainError = screen.getByTestId("mainError");
    const spinner = screen.queryByRole("progressbar");

    expect(mainError).toHaveTextContent(invalidCredentialsError.message);
    expect(spinner).not.toBeInTheDocument();
  });

  test("should add access_token to localStorage on success", async () => {
    const { authenticationSpy } = makeSut();

    await simulateValidSubmit({});

    await waitFor(() => {
      expect(localStorage.setItem).toHaveBeenCalledWith("accessToken", authenticationSpy.account.accessToken);
    });

    expect(history.get()).toBe("/");
  });

  test("should go to signup page", async () => {
    makeSut();

    const register = screen.getByText(/criar conta/i);

    await userEvent.click(register);

    expect(history.get()).toBe("/signup");
  });
});
