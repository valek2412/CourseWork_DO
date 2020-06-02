import React, { useRef, useState } from "react";
import State from "components/State";
import { Cell, PieChart, Tooltip, Pie } from "recharts";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import { geneticAlgorithm } from "core/algorithms";
import {
  makeRandomSkeleton,
  firstProblemSkeleton,
  secondProblemSkeleton,
} from "problems";
import { getState, renderCustomizedLabel } from "./utils";
import {isNumber} from "lodash";

const Genetic = () => {
  const [amountCategories, setAmountCategories] = useState(4);
  const [amountTests, setAmountTests] = useState(8);
  const [suitsTotalCount, setSuitsTotalCount] = useState(4);
  const [state, setState] = useState(null);
  const [generalDiff, setGeneralDiff] = useState(null);
  const [iterationData, setIterationData] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [iterations, setIterations] = useState(10);
  const [numberOfParents, setNumberOfParents] = useState(16);
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
    } = geneticAlgorithm(
      state.clone(),
      suitsTotalCount,
      iterations,
      numberOfParents
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
          Натисніть для запуску алгоритму
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
          onChange={(e) => setNumberOfParents(+e.target.value)}
          value={numberOfParents}
          type="number"
          label="К-сть батьків"
        />
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

      {iterationData.map((iteration, i) => {
        const data = [
          {
            value: iteration.metaData.selectionDiff,
            name: "Селекція",
          },
          {
            value: iteration.metaData.creatingSuccessorsDiff,
            name: "Створення нащадків",
          },
          {
            value: iteration.metaData.mutatingSuccessorsDiff,
            name: "Мутація нащадків",
          },
          {
            value: iteration.metaData.optimizingSuccessorsDiff,
            name: "Оптимізація наслідників",
          },
        ];
        return (
          <div key={String(i)} className="mt-3">
            <h4 className="my-4">
              <b>Дані найкращих особин популяцій</b>
            </h4>
            <h6>
              <i>Покоління {i + 1}</i>
            </h6>
            <PieChart width={300} height={300}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                fill="#8884d8"
                labelLine={false}
                label={renderCustomizedLabel}
              />
              {data.map((entry, index) => (
                <Cell key={String(`cell-${index}`)} />
              ))}
              <Tooltip />
            </PieChart>
            <State state={iteration.state} />
            <Divider />
          </div>
        );
      })}
    </div>
  );
};

export default Genetic;
