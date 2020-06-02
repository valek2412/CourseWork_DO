import React, { useRef, useState } from "react";
import State from "components/State";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { beeAlgorithm } from "core/algorithms";
import {
  firstProblemSkeleton,
  makeRandomSkeleton,
  secondProblemSkeleton,
} from "problems";
import { getState } from "./utils";

const Bee = () => {
  const [amountCategories, setAmountCategories] = useState(4);
  const [amountTests, setAmountTests] = useState(8);
  const [suitsTotalCount, setSuitsTotalCount] = useState(4);
  const [state, setState] = useState(null);
  const [generalDiff, setGeneralDiff] = useState(null);
  const [iterationData, setIterationData] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [iterations, setIterations] = useState(10);
  const [amountStartStates, setAmountStartStates] = useState(16);
  const [amountBestStates, setAmountBestStates] = useState(1);
  const fileRef = useRef();

  const createStateHandler = (skeleton) => {
    setProcessing(true);
    const newSkeleton =
      skeleton || makeRandomSkeleton(amountTests, amountCategories);
    const newState = getState(newSkeleton, suitsTotalCount);
    setState(newState);
    setProcessing(false);
  };

  const handleFile = async (file) => {
    if (!file) return;
    const data = await new Response(file).text();
    const skeleton = JSON.parse(data);
    createStateHandler(skeleton);
  };

  const algoHandler = () => {
    setProcessing(true);
    const {
      state: newState,
      metaData: { iterationData: iData, generalDiff: _generalDiff },
    } = beeAlgorithm(
      state.clone(),
      suitsTotalCount,
      iterations,
      amountStartStates,
      amountBestStates
    );
    setIterationData(iData);
    setState(newState);
    setGeneralDiff(_generalDiff);
    setProcessing(false);
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
      <div className="row ml-2 mb-5">
        <Button
          variant="contained"
          color="primary"
          onClick={algoHandler}
          disabled={!state || processing}
        >
          Натисніть для запуска алгоритму
        </Button>
        <TextField
          className="form-control col-1 ml-5"
          onChange={(e) => setIterations(+e.target.value)}
          value={iterations}
          type="number"
          label="К-сть ітерацій"
        />
        <TextField
          className="form-control col-1 ml-5"
          onChange={(e) => setAmountStartStates(+e.target.value)}
          value={amountStartStates}
          type="number"
          label="К-сть генерацій"
        />
        <TextField
          className="form-control col-1 ml-5"
          onChange={(e) => setAmountBestStates(+e.target.value)}
          value={amountBestStates}
          type="number"
          label="К-сть кращих г-ій"
        />
      </div>
      {state && (
        <div>
          <State state={state} />
          {generalDiff && (
            <div>
              <i>Часу витрачено: {generalDiff} мс</i>
            </div>
          )}
        </div>
      )}
      {iterationData.map((iteration, i) => (
        <div key={String(i)} className="mt-3">
          <h4 className="my-4">
            <b>Дані найкращих особин популяцій</b>
          </h4>
          <h6>
            <i>Покоління {i + 1}</i>
          </h6>
          <div>
            <i>Часу витрачено: {iteration.metaData.generalDiff} мс</i>
          </div>
          <State state={iteration.state} />
        </div>
      ))}
    </div>
  );
};

export default Bee;
