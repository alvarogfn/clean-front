import { useContext } from "solid-js";
import { Spinner } from "..";

import Context from "@/presentation/contexts/form-context";
import Styles from "./form-status.module.scss";

const FormStatus = () => {
  const { state } = useContext(Context);

  const { isLoading, mainError } = state;

  return (
    <div data-testid="error-wrap" class={Styles.errorWrap}>
      {isLoading && <Spinner class={Styles.spinner} />}
      {mainError && <span class={Styles.error}>{mainError}</span>}
    </div>
  );
};

export default FormStatus;
