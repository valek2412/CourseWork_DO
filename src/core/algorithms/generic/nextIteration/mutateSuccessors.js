import { random } from "lodash";
import State from "core/state";

const mutate = (_state) => {
  const state = _state.clone();
  const transponatedMatrix = state.transposeTests();
  const randomCategoryIndex = random(state.totalCategories - 1);
  const [firstQuestionIndex, secondQuestionIndex] = [
    random(state.totalQuestions - 1),
    random(state.totalQuestions - 1),
  ];
  [
    transponatedMatrix[randomCategoryIndex][firstQuestionIndex].suite,
    transponatedMatrix[randomCategoryIndex][secondQuestionIndex].suite,
  ] = [
    transponatedMatrix[randomCategoryIndex][secondQuestionIndex].suite,
    transponatedMatrix[randomCategoryIndex][firstQuestionIndex].suite,
  ];
  return new State(transponatedMatrix, true);
};

const mutateSuccessors = (successors) => successors.map((s) => s |> mutate);

export default mutateSuccessors;
