import React, { useState, useRef } from "react";
import { isNumber } from "lodash";
import State from "components/State";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { greedyAlgorithm } from "core/algorithms";
import {
  firstProblemSkeleton,
  makeRandomSkeleton,
  secondProblemSkeleton,
} from "problems";
import { getState } from "./utils";

const Greedy = () => {
  const [amountCategories, setAmountCategories] = useState(4);
  const [amountTests, setAmountTests] = useState(8);
  const [suitsTotalCount, setSuitsTotalCount] = useState(4);
  const [state, setState] = useState(null);
  const [generalDiff, setGeneralDiff] = useState(null);
  const [processing, setProcessing] = useState(false);
  const fileRef = useRef();

  const createStateHandler = (skeleton) => {
    setProcessing(true);
    const newSkeleton =
      skeleton || makeRandomSkeleton(amountTests, amountCategories);
    const newState = getState(newSkeleton, suitsTotalCount);
    setState(newState);
    setProcessing(false);
  };

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

  const handleFile = async (file) => {
    if (!file) return;
    const data = await new Response(file).text();
    const skeleton = JSON.parse(data);
    createStateHandler(skeleton);
  };

  return (
    <div className="table">
      <div className="row ml-2 mb-5">
        <Button
          variant="contained"
          color="primary"
          onClick={() => createStateHandler()}
          disabled={processing}
        >
          Згенерувати індивідуальну задачу
        </Button>
        <TextField
          className="form-control col-1 ml-5"
          onChange={(e) => setAmountCategories(+e.target.value)}
          value={amountCategories}
          type="number"
          label="К-сть категорій"
        />
        <TextField
          className="form-control col-1 ml-5"
          onChange={(e) => setAmountTests(+e.target.value)}
          value={amountTests}
          type="number"
          label="К-сть запитань"
        />
        <TextField
          className="form-control col-1 ml-5"
          onChange={(e) => setSuitsTotalCount(+e.target.value)}
          value={suitsTotalCount}
          type="number"
          label="К-сть наборів тестів"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => createStateHandler(firstProblemSkeleton)}
          disabled={processing}
          className="col-1 ml-5"
        >
          Обрати ІЗ #1
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => createStateHandler(secondProblemSkeleton)}
          disabled={processing}
          className="col-1 ml-5"
        >
          Обрати ІЗ #2
        </Button>
        <Button variant="contained" component="label" className="col-2 ml-5">
          Завантажити ІЗ
          <input
            type="file"
            className="d-none"
            accept=".json"
            ref={fileRef}
            onChange={(e) =>
              handleFile(e.target.files[0])
                .catch((err) => console.error(err))
                .finally(() => {
                  fileRef.current.value = null;
                })
            }
          />
        </Button>
      </div>
      <div className="row ml-2 mb-3">
        <Button
          variant="contained"
          color="primary"
          onClick={algoHandler}
          disabled={!state || processing}
        >
          Натисніть для запуску алгоритму
        </Button>
      </div>
      {state && (
        <div>
          <State state={state} />
          {isNumber(generalDiff) && (
            <div>
              <i>Часу витрачено: {generalDiff} мс</i>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Greedy;
