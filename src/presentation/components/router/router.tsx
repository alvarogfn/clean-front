import { Login } from "@/presentation/pages";
import { Route, Router } from "@solidjs/router";
import type { Component } from "solid-js";

import "@/presentation/styles/global.scss";

const CustomRouter: Component = () => {
  return (
    <Router>
      <Route path="/" component={() => <div>oi</div>} />
      <Route path="/login" component={Login} />
    </Router>
  );
};

export default CustomRouter;