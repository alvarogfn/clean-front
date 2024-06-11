import { Spinner } from "..";

import Styles from "./form-status.module.scss";

const FormStatus = () => {
  return (
    <div class={Styles.errorWrap}>
      <Spinner class={Styles.spinner} />
      <span class={Styles.error}>Erro</span>
    </div>
  );
};

export default FormStatus;
