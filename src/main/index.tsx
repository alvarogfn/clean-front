/* @refresh reload */
import { makeLogin } from "@/main/factories/pages/login/login-factory";
import { Router } from "@/presentation/components";
import { render } from "solid-js/web";

import "@/presentation/styles/global.scss";

const root = document.getElementById("root") as HTMLDivElement;

render(() => <Router makeLogin={makeLogin} />, root);
