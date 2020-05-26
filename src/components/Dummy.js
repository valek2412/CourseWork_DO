import React, { useState } from "react";

import { genericAlgorithm } from "core/algorithms";
import DataState from "core/state";
import skeleton from "problems/2";

import State from "components/State";

const Dummy = () => {
  const [state, setState] = useState(new DataState(skeleton));

  const algoHandler = () => {
    const newState = genericAlgorithm(state.clone(), 2);
    setState(newState);
  };
  return (
    <div className="table">
      <button type="button" onClick={algoHandler}>
        click me
      </button>
      <State state={state} />
    </div>
  );
};

export default Dummy;
