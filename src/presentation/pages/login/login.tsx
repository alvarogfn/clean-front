import { Footer, FormStatus, Input, LoginHeader } from "@/presentation/components";
import type { Validation } from "@/presentation/protocols/validation";
import {type Component, createEffect, createMemo, createSignal} from "solid-js";

import styles from "./login.module.scss";
import Context from "@/presentation/contexts/form-context";

interface LoginProps {
  validation: Validation;
}

const Login: Component<LoginProps> = ({ validation }) => {

  const [state, setState] = createSignal({
    isLoading: false,
    email: '',
    password: '',
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
    mainError: "Campo obrigatório",
  });

  const email = createMemo(() => state().email);
  const password = createMemo(() => state().password);


  createEffect(() => {
    validation.validate({ email: email() });
  })

  createEffect(() => {
    validation.validate({ password: password() });
  })

  return (
    <div class={styles.login}>
      <LoginHeader />
      <Context.Provider value={{ state, setState }}>
        <form class={styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail" />
          <Input type="password" name="password" placeholder="Digite sua senha" />
          <button class={styles.submit} disabled type="submit">
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
