import type { Component, JSX } from "solid-js";
import classnames from "classnames";
import Styles from "./spinner.module.scss";

interface Props extends JSX.HTMLAttributes<HTMLDivElement> {}

const Spinner: Component<Props> = (props: Props) => {
  return (
    <div
      role="progressbar"
      aria-valuenow="0"
      aria-valuemin="0"
      aria-valuemax="100"
      aria-valuetext="Working…"
      aria-busy="true"
      aria-live="assertive"
      {...props}
      class={classnames(Styles.spinner, props.class)}
    >
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Spinner;
