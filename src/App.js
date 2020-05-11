import React from "react";
import { hot } from "react-hot-loader/root";
import { Route, Switch } from "react-router";
import { HashRouter as Router } from "react-router-dom";
import Home from "./components/Home";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
}

export default hot(App);
