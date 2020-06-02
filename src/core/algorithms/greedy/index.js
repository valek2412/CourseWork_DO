import getGreediedState from "./getGreediedState";

const greedyAlgorithm = (initialState, suitsTotalCount) => {
  const before = new Date();

  const state = getGreediedState(initialState, suitsTotalCount).clone();

  const after = new Date();
  const metaData = {
    generalDiff: after - before,
  };

  return { state, metaData };
};

const wrapper = (initialState, suitsTotalCount) => {
  const { state, metaData } = greedyAlgorithm(initialState, suitsTotalCount);
  console.info("");
  console.info(`greedyAlgorithm in ${metaData.generalDiff} ms`);
  console.info(`Current fitness value: ${state.fitnessValue}`);
  console.info("");

  return { state, metaData };
};

export default wrapper;
