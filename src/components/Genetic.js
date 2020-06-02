import React, { useState } from "react";

import { geneticAlgorithm } from "core/algorithms";
import DataState from "core/state";
import skeleton from "problems/1";
import State from "components/State";
import { Cell, PieChart, Tooltip, Pie } from "recharts";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";

const getState = (suitsTotalCount) => {
  const initialState = new DataState(skeleton);
  initialState.randomizeSuites(suitsTotalCount);
  return initialState;
};

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const Genetic = () => {
  const initialState = getState(4);
  const [state, setState] = useState(initialState);
  const [iterationData, setIterationData] = useState([]);
  const [processing, setProcessing] = useState(false);
  const [iterations, setIterations] = useState(10);
  const [numberOfParents, setNumberOfParents] = useState(16);
  const [suitsTotalCount, setSuitsTotalCount] = useState(4);

  const algoHandler = () => {
    setProcessing(true);
    const {
      state: newState,
      metaData: { iterationData: iData },
    } = geneticAlgorithm(
      state.clone(),
      suitsTotalCount,
      iterations,
      numberOfParents
    );
    setIterationData(iData);
    setState(newState);
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
          onChange={(e) => setIterations(+e.target.value)}
          value={iterations}
          type="number"
          label="Кількість ітерацій"
        />
        <TextField
          className="form-control col-1 ml-5"
          onChange={(e) => setNumberOfParents(+e.target.value)}
          value={numberOfParents}
          type="number"
          label="Кількість батьків"
        />
        <TextField
          className="form-control col-1 ml-5"
          onChange={(e) => setSuitsTotalCount(+e.target.value)}
          value={suitsTotalCount}
          type="number"
          label="Кількість наборів"
        />
      </div>
      <State state={state} />

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
