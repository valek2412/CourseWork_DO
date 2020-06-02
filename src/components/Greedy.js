import React, { useState } from "react";
import { greedyAlgorithm } from "core/algorithms";
import DataState from "core/state";
import skeleton from "problems/1";
import State from "components/State";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

const getState = () => new DataState(skeleton);

const Greedy = () => {
  const initialState = getState();
  const [state, setState] = useState(initialState);
  const [processing, setProcessing] = useState(false);
  const [generalDiff, setGeneralDiff] = useState(null);
  const [suitsTotalCount, setSuitsTotalCount] = useState(4);

  const algoHandler = () => {
    setProcessing(true);
    const {
      state: newState,
      metaData: { generalDiff: _generalDiff },
    } = greedyAlgorithm(state.clone(), suitsTotalCount);
    setState(newState);
    setGeneralDiff(_generalDiff);
    setProcessing(false);
  };
  return (
    <div className="table">
      <div className="row ml-2 mb-3">
        <Button
          variant="contained"
          color="primary"
          onClick={algoHandler}
          disabled={processing}
        >
          Нажміть для запуску алгоритму
        </Button>
        <TextField
          className="form-control col-1 ml-5"
          onChange={(e) => setSuitsTotalCount(+e.target.value)}
          value={suitsTotalCount}
          type="number"
          label="Кількість наборів"
        />
      </div>
      <State state={state} />
      {generalDiff && (
        <>
          <br />
          <div>
            <i>Зроблено за {generalDiff} мс</i>
          </div>
        </>
      )}
    </div>
  );
};

export default Greedy;
