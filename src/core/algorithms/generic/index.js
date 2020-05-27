import { minBy } from "lodash";
import nextIteration from "./nextIteration";

const createState = (_state, suitsTotalCount) => {
  const state = _state.clone();
  state.randomizeSuites(suitsTotalCount);
  return state;
};

// todo: validate no repeats
const generatePopulation = (initialState, suitsTotalCount) => {
  const numberOfParents = 16;
  return [...Array(numberOfParents)].map(() =>
    createState(initialState, suitsTotalCount)
  );
};

// todo: add metadata
const genericAlgorithm = (initialState, suitsTotalCount, iterations) => {
  const before = new Date();
  // generating population

  const beforeInitialPopulation = new Date();
  const initialPopulation = generatePopulation(initialState, suitsTotalCount);
  const afterInitialPopulation = new Date();

  let population = initialPopulation;
  // making improvements while condition is true
  let counter = iterations;

  const iterationData = [];
  let iterationMetadata;
  while (counter) {
    const best = minBy(population, "fitnessValue").clone();
    // if (best.fitnessValue < 3) break;
    [population, iterationMetadata] = nextIteration(population);
    iterationData.push({
      state: best,
      metaData: iterationMetadata,
    });
    counter--;
  }

  const state = minBy(population, "fitnessValue").clone();
  const after = new Date();
  const metaData = {
    generalDiff: after - before,
    initialPopulationDiff: afterInitialPopulation - beforeInitialPopulation,
    iterationsCount: iterations - counter,
    iterationData,
  };

  return { state, metaData };
};

const wrapper = (initialState, suitsTotalCount, iterations = 200) => {
  const { state, metaData } = genericAlgorithm(
    initialState,
    suitsTotalCount,
    iterations
  );
  console.info("");
  console.info(`genericAlgorithm in ${metaData.generalDiff} ms`);
  console.info(`initialPopulationDiff: ${metaData.initialPopulationDiff} ms`);
  console.info(`Current fitness value: ${state.fitnessValue}`);
  console.info(`Iterations: ${metaData.iterationsCount}`);
  console.info("");

  return { state, metaData };
};

export default wrapper;
