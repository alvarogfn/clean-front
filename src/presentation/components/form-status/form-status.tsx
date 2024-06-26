import { useContext } from "solid-js";
import { Spinner } from "..";

import Context from "@/presentation/contexts/form-context";
import Styles from "./form-status.module.scss";

const FormStatus = () => {
  const { state } = useContext(Context);

  return (
    <div data-testid="error-wrap" class={Styles.errorWrap}>
      {state.isLoading && <Spinner class={Styles.spinner} />}
      {state.mainError && (
        <span data-testid="mainError" class={Styles.error}>
          {state.mainError}
        </span>
      )}
    </div>
  );
};

export default FormStatus;
