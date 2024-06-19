import Context from "@/presentation/contexts/form-context";
import {type Component, createMemo, type JSX, on, useContext} from "solid-js";
import styles from "./input.module.scss";

interface InputProps extends JSX.InputHTMLAttributes<HTMLInputElement> {}

const Input: Component<InputProps> = (props) => {
  const { state, setState } = useContext(Context);

  const error = createMemo(() => {
    return state[`${props.name}Error`];
  })

  const getStatus = (): string => {
    return "🔴";
  };

  const getTitle = (): string => {
    return error();
  };

  const handleChange: JSX.InputEventHandler<HTMLInputElement, InputEvent> = (event): void => {
    setState((state: object) => ({ ...state, [event.target.name]: event.target.value }));
  };

  return (
    <div class={styles.inputWrap}>
      <input data-testid={props.name} autocomplete="false" onInput={handleChange} {...props} />
      <span data-testid={`${props.name}-status`} title={getTitle()} class={styles.status}>
        {getStatus()}
      </span>
    </div>
  );
};

export default Input;
