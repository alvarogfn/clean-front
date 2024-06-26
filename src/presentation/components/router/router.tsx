import { Route, Router } from "@solidjs/router";
import type { Component } from "solid-js";

interface CustomRouterProps {
  makeLogin: Component;
}

function CustomRouter({ makeLogin }: CustomRouterProps) {
  return (
    <Router>
      <Route path="/login" component={makeLogin} />
    </Router>
  );
}

export default CustomRouter;
