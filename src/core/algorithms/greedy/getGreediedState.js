import { minBy, maxBy } from "lodash";
import State from "../../state";

const setExtremumSuite = (categoryTests, isIncremented, currentSuite) => {
  const by = isIncremented ? maxBy : minBy;
  const test = by(
    categoryTests.filter((t) => !t.suite),
    "complexity"
  );
  if (!test) return;
  test.suite = currentSuite;
};

const getGreediedState = (initialState, suitsTotalCount) => {
  const transponatedMatrix = initialState.getTransposedTests();
  transponatedMatrix.forEach((categoryTests, j) => {
    categoryTests.forEach((_t, i) => {
      const isIncremented = !(j % 2);
      const currentSuite = 1 + (i % suitsTotalCount);
      setExtremumSuite(categoryTests, isIncremented, currentSuite);
    });
  });
  return new State(transponatedMatrix, true);
};

export default getGreediedState;
