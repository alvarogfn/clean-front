import { Footer, FormStatus, Input, LoginHeader } from "@/presentation/components";
import type { Component } from "solid-js";
import Styles from "./login.module.scss";

const Login: Component = () => {
  return (
    <div class={Styles.login}>
      <LoginHeader />
      <form class={Styles.form}>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button class={Styles.submit} type="submit">
          Entrar
        </button>
        <span class={Styles.link}>Criar conta</span>
        <FormStatus />
      </form>
      <Footer />
    </div>
  );
};

export default Login;
