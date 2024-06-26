import { makeLoginValidation } from "@/main/factories/pages/login/login-validation-factory";
import { makeRemoteAuthentication } from "@/main/factories/usecases/authentication/remote-authentication-factory";
import { Login } from "@/presentation/pages";
import type { JSX } from "solid-js";

export const makeLogin = (): JSX.Element => {
  return <Login authentication={makeRemoteAuthentication()} validation={makeLoginValidation()} />;
};
