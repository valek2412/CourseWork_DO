import State from "core/state";

const getSuitesData = (suiteComplexities) => {
  const [maxValue, minValue] = [
    Math.max(suiteComplexities.values),
    Math.min(suiteComplexities.values),
  ];
  const findKey = (value) =>
    Object.keys({ ...suiteComplexities }).find(
      (k) => suiteComplexities.get(k) === value
    );
  const [maxSuite, minSuite] = [maxValue |> findKey, minValue |> findKey];

  return { maxSuite, minSuite, maxValue, minValue };
};

const simulateState = (_state, categoryIndex, i, j) => {
  const state = _state.clone();
  const transponatedMatrix = state.getTransposedTests();
  [
    transponatedMatrix[categoryIndex][i].suite,
    transponatedMatrix[categoryIndex][j].suite,
  ] = [
    transponatedMatrix[categoryIndex][j].suite,
    transponatedMatrix[categoryIndex][i].suite,
  ];

  return new State(transponatedMatrix, true);
};

const optimize = (_state) => {
  const state = _state.clone();
  const transponatedMatrix = state.getTransposedTests();
  let isOptimized = false;
  const optimizedTests = transponatedMatrix.reduce(
    (acc, categoryTests, idx, srcArr) => {
      if (isOptimized) return [...acc, categoryTests];

      const remainingSlice = srcArr.slice(idx);
      const tempState = new State([...acc, ...remainingSlice], true);

      const { minSuite, maxSuite } =
        tempState.suiteComplexities |> getSuitesData;

      // possible optimization

      let cache = null;

      categoryTests.forEach((firstT, i) => {
        categoryTests.forEach((secondT, j) => {
          if (cache || i === j) return;

          if (
            (firstT.suite === minSuite && secondT.suite === maxSuite) ||
            (firstT.suite === maxSuite && secondT.suite === minSuite)
          ) {
            const simulatedState = simulateState(tempState, idx, i, j);

            // optimized
            if (simulatedState.fitnessValue > tempState.fitnessValue) {
              isOptimized = true;
              const transponatedMatrixOfOptimizedState = simulatedState.getTransposedTests();

              cache = [...acc, transponatedMatrixOfOptimizedState[idx]];
            }
          }
        });
      });

      if (cache) return cache;

      return [...acc, categoryTests];
    },
    []
  );
  return new State(optimizedTests, true);
};

const optimizeLocally = (successors) => successors.map((s) => s |> optimize);

export default optimizeLocally;
