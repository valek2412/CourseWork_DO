import React, { useState } from "react";

import { beeAlgorithm } from "core/algorithms";
import DataState from "core/state";
import skeleton from "problems/1";
import State from "components/State";
import { Cell, PieChart, Tooltip, Pie } from "recharts";

const suitsTotalCount = 4;

const getState = () => {
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

const Dummy1 = () => {
    const initialState = getState();
    const [state, setState] = useState(initialState);
    const [iterationData, setIterationData] = useState([]);
    const [processing, setProcessing] = useState(false);
    const [iterations, setIterations] = useState(200);
    const [amountStartStates, setAmountStartStates] = useState(16);
    const [amountBestStates, setAmountBestStates] = useState(1);

    const algoHandler = () => {
        setProcessing(true);
        const {
            state: newState,
            metaData: { iterationData: iData },
        } = beeAlgorithm(state.clone(), suitsTotalCount, iterations, amountStartStates, amountBestStates);
        setIterationData(iData);
        setState(newState);
        setProcessing(false);
    };
    return (
        <div className="table">
            <div className="row">
                <button
                    type="button"
                    onClick={algoHandler}
                    disabled={processing}
                    className="btn btn-dark"
                >
                    click me
                </button>
                <input
                    className="form-control col-1 ml-2"
                    onChange={(e) => setIterations(+e.target.value)}
                    value={iterations}
                />
                <input
                    className="form-control col-1 ml-2"
                    onChange={(e) => setAmountStartStates(+e.target.value)}
                    value={amountStartStates}
                />
                <input
                    className="form-control col-1 ml-2"
                    onChange={(e) => setAmountBestStates(+e.target.value)}
                    value={amountBestStates}
                />
            </div>
            <State state={state} />
            <br />
            <br />
            <br />
            <br />
            bestOfPopulation
            {iterationData.map((iteration) => {
                const data = [
                    {
                        value: iteration.metaData.selectionDiff,
                        name: "selectionDiff",
                    },
                    {
                        value: iteration.metaData.creatingSuccessorsDiff,
                        name: "creatingSuccessorsDiff",
                    },
                    {
                        value: iteration.metaData.mutatingSuccessorsDiff,
                        name: "mutatingSuccessorsDiff",
                    },
                    {
                        value: iteration.metaData.optimizingSuccessorsDiff,
                        name: "optimizingSuccessorsDiff",
                    },
                ];
                return (
                    <div>
                        Meta data
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
                    </div>
                );
            })}
        </div>
    );
};

export default Dummy1;
