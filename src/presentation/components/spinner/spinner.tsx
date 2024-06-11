import type { Component, JSX } from "solid-js";

import Styles from "./spinner.module.scss";

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {}

const Spinner: Component<Props> = (props: Props) => {
  return (
    <div {...props} class={[Styles.spinner, props.class].join(" ")}>
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
