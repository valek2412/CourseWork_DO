import { random } from "lodash";
import State from "core/state";

const mutate = (_state) => {
  const state = _state.clone();
  const randomCategoryIndex = random(state.totalCategories - 1);
  const [firstQuestionIndex, secondQuestionIndex] = [
    random(state.totalQuestions - 1),
    random(state.totalQuestions - 1),
  ];
  [
    state.tests[firstQuestionIndex][randomCategoryIndex].suite,
    state.tests[secondQuestionIndex][randomCategoryIndex].suite,
  ] = [
    state.tests[secondQuestionIndex][randomCategoryIndex].suite,
    state.tests[firstQuestionIndex][randomCategoryIndex].suite,
  ];
  return new State(state.tests, true);
};

const mutateSuccessors = (successors) => successors.map((s) => s |> mutate);

export default mutateSuccessors;
