import React from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import Genetic from "./components/Genetic";
import Bee from "./components/Bee";
import Greedy from "./components/Greedy";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/genetic">
            <Genetic />
          </Route>
          <Route path="/dummy1">
            <Bee />
          </Route>
          <Route path="/greedy">
            <Greedy />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default hot(App);
