import type { Component, JSX } from "solid-js";
import Styles from "./input.module.scss";

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

const Input: Component<InputProps> = (props) => {
  return (
    <div class={Styles.inputWrap}>
      <input {...props} />
      <span class={Styles.status}>🔴</span>
    </div>
  );
};

export default Input;
