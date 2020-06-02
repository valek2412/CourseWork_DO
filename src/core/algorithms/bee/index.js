import { minBy } from "lodash";
import nextIteration from "./nextIteration";

const createState = (_state, suitsTotalCount) => {
  const state = _state.clone();
  state.randomizeSuites(suitsTotalCount);
  return state;
};

// todo: validate no repeats
const generateStates = (initialState, suitsTotalCount, amountStates) =>
  [...Array(amountStates)].map(() =>
    createState(initialState, suitsTotalCount)
  );

const beeAlgorithm = (
  initialState,
  suitsTotalCount,
  iterations,
  amountStartStates,
  amountBestStates
) => {
  const before = new Date();

  const beforeInitialStates = new Date();
  const initialStates = generateStates(
    initialState,
    suitsTotalCount,
    amountStartStates
  );
  const afterInitialStates = new Date();

  const sortStates = initialStates.sort(
    (a, b) => a.fitnessValue - b.fitnessValue
  );

  let bestStates = sortStates.slice(0, amountBestStates);

  let counter = iterations;

  const iterationData = [];
  let iterationMetadata;
  while (counter) {
    const best = minBy(bestStates, "fitnessValue").clone();
    // if (best.fitnessValue < 3) break;
    [bestStates, iterationMetadata] = nextIteration(bestStates);
    iterationData.push({
      state: best,
      metaData: iterationMetadata,
    });
    counter--;
  }

  const state = minBy(bestStates, "fitnessValue").clone();
  const after = new Date();
  const metaData = {
    generalDiff: after - before,
    initialStatesDiff: afterInitialStates - beforeInitialStates,
    iterationsCount: iterations - counter,
    iterationData,
  };

  return { state, metaData };
};

const wrapper = (
  initialState,
  suitsTotalCount,
  iterations,
  amountStartStates = 16,
  amountBestStates = 1
) => {
  const { state, metaData } = beeAlgorithm(
    initialState,
    suitsTotalCount,
    iterations,
    amountStartStates,
    amountBestStates
  );
  console.info("");
  console.info(`beeAlgorithm in ${metaData.generalDiff} ms`);
  console.info(`initialStatesDiff: ${metaData.initialStatesDiff} ms`);
  console.info(`Current fitness value: ${state.fitnessValue}`);
  console.info(`Iterations: ${metaData.iterationsCount}`);
  console.info("");

  return { state, metaData };
};

export default wrapper;
