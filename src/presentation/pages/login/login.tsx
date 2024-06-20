import { Footer, FormStatus, Input, LoginHeader } from "@/presentation/components";
import type { Validation } from "@/presentation/protocols/validation";
import { type Component, createEffect, JSX } from "solid-js";

import Context from "@/presentation/contexts/form-context";
import { createStore } from "solid-js/store";
import styles from "./login.module.scss";
import EventHandler = JSX.EventHandler;

interface LoginProps {
  validation: Validation;
}

const Login: Component<LoginProps> = ({ validation }) => {
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

  const handleSubmit: EventHandler<HTMLFormElement, SubmitEvent> = (event) => {
    event.preventDefault();
    setState("isLoading", true);
  };

  return (
    <div class={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form class={styles.form} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button class={styles.submit} disabled={state.emailError || state.passwordError} type="submit">
            Entrar
          </button>
          <span class={styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
      <Footer />
    </div>
  );
};

export default Login;
