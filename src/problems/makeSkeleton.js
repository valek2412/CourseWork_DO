import { random } from "lodash";

const makeSkeleton = (tests, categories) =>
  [...Array(tests)].map(() =>
    [...Array(categories)].map(() => random(1, 10, false))
  );

export default makeSkeleton;
