import { maxBy } from "lodash";
import nextIteration from "./nextIteration";

const createState = (_state, suitsTotalCount) => {
  const state = _state.clone();
  state.randomizeSuites(suitsTotalCount);
  return state;
};

// todo: validate no repeats
const generatePopulation = (initialState, suitsTotalCount) => {
  const numberOfParents = 16;

  return new Array(numberOfParents).fill(
    createState(initialState, suitsTotalCount)
  );
};

// todo: add metadata
const genericAlgorithm = (initialState, suitsTotalCount, iterations) => {
  // generating population
  const initialPopulation = generatePopulation(initialState, suitsTotalCount);

  let population = initialPopulation;
  // making improvements while condition is true
  let counter = iterations;
  while (counter) {
    population = nextIteration(population);
    counter--;
  }

  return maxBy(initialPopulation, "fitnessValue");
};

const wrapper = (initialState, suitsTotalCount, iterations = 200) => {
  const before = new Date();
  const ret = genericAlgorithm(initialState, suitsTotalCount, iterations);
  const after = new Date();
  console.info("");
  console.info(`genericAlgorithm in ${after - before} ms`);
  console.info(`Current fitness value: ${ret.fitnessValue}`);
  console.info(`Iterations: ${iterations}`);
  console.info("");

  return ret;
};

export default wrapper;
