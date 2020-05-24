import React from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";
import State from "./components/State";
import DataState from "./core/state";
import secondProblem from "./problems/2";

function App() {
  const state = DataState.initSample();
  const secondState = new DataState(secondProblem);
  secondState.randomizeSuites(2);
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/state">
            <State state={state} />
            <State state={secondState} />
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
