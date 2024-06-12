import { type Component, type JSX, useContext } from "solid-js";
import styles from "./input.module.scss";
import Context from "@/presentation/contexts/form-context";

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

const Input: Component<InputProps> = (props) => {
  const { state, setState } = useContext(Context);

  const error = state()[`${props.name}Error`];

  const getStatus = (): string => {
    return "🔴";
  };

  const getTitle = (): string => {
    return error;
  };

  const handleChange: JSX.EventHandler<HTMLInputElement, InputEvent> = (event): void => {
    setState((state) => ({...state,
      [event.target.name]: event.target.value
    }))
  }

  return (
    <div class={styles.inputWrap}>
      <input data-testid={props.name} autocomplete="false" onInput={handleChange}  {...props} />
      <span data-testid={`${props.name}-status`} title={getTitle()} class={styles.status}>
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
