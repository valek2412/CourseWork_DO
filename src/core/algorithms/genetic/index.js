import { minBy } from "lodash";
import nextIteration from "./nextIteration";

const createState = (_state, suitsTotalCount) => {
  const state = _state.clone();
  state.randomizeSuites(suitsTotalCount);
  return state;
};

// todo: validate no repeats
const generatePopulation = (initialState, suitsTotalCount, numberOfParents) =>
  [...Array(numberOfParents)].map(() =>
    createState(initialState, suitsTotalCount)
  );

const geneticAlgorithm = (
  initialState,
  suitsTotalCount,
  iterations,
  numberOfParents
) => {
  const before = new Date();
  // generating population

  const beforeInitialPopulation = new Date();
  const initialPopulation = generatePopulation(
    initialState,
    suitsTotalCount,
    numberOfParents
  );
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

const wrapper = (
  initialState,
  suitsTotalCount,
  iterations,
  numberOfParents
) => {
  const { state, metaData } = geneticAlgorithm(
    initialState,
    suitsTotalCount,
    iterations,
    numberOfParents
  );
  console.info("");
  console.info(`geneticAlgorithm in ${metaData.generalDiff} ms`);
  console.info(`initialPopulationDiff: ${metaData.initialPopulationDiff} ms`);
  console.info(`Current fitness value: ${state.fitnessValue}`);
  console.info(`Iterations: ${metaData.iterationsCount}`);
  console.info("");

  return { state, metaData };
};

export default wrapper;
