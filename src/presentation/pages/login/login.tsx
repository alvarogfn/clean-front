import type { Authentication } from "@/domain/usecases/authentication";
import { Footer, FormStatus, Input, LoginHeader } from "@/presentation/components";
import Context from "@/presentation/contexts/form-context";
import type { Validation } from "@/presentation/protocols/validation";
import { A, useNavigate } from "@solidjs/router";
import type { Component, JSX } from "solid-js";
import { createEffect } from "solid-js";
import { createStore } from "solid-js/store";
import styles from "./login.module.scss";

interface LoginProps {
  validation: Validation;
  authentication: Authentication;
}

const Login: Component<LoginProps> = ({ validation, authentication }) => {
  const navigate = useNavigate();

  const [state, setState] = createStore({
    isLoading: false,
    email: "",
    password: "",
    emailError: "",
    passwordError: "",
    mainError: "",
  });

  createEffect(() => {
    setState({
      emailError: validation.validate("email", state.email),
      passwordError: validation.validate("password", state.password),
    });
  });

  const handleSubmit: JSX.EventHandler<HTMLFormElement, SubmitEvent> = async (event) => {
    try {
      event.preventDefault();

      if (state.isLoading || state.emailError || state.passwordError) return;

      setState("isLoading", true);

      const account = await authentication.auth({ email: state.email, password: state.password });

      localStorage.setItem("accessToken", account.accessToken);
      navigate("/");
    } catch (error) {
      setState("isLoading", false);
      if (error instanceof Error) {
        setState("mainError", error.message);
      } else {
        throw error;
      }
    }
  };

  return (
    <div class={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form role="form" class={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button class={styles.submit} disabled={!!state.emailError || !!state.passwordError} type="submit">
            Entrar
          </button>
          <A href="/signup" class={styles.link}>
            Criar conta
          </A>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
