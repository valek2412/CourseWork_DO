import { random } from "lodash";

const makeRandomSkeleton = (tests, categories) =>
  [...Array(tests)].map(() =>
    [...Array(categories)].map(() => random(1, 10, false))
  );

export default makeRandomSkeleton;
