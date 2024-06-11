import type { Component } from "solid-js";
import { Logo } from "..";

import Styles from "./login-header.module.scss";

const LoginHeader: Component = () => {
  return (
    <header class={Styles.header}>
      <Logo />
      <h1>4Dev - Enquetes para Programadores</h1>
    </header>
  );
};

export default LoginHeader;
