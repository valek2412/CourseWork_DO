import selection from "./selection";
import createSuccessors from "./createSuccessors";
import mutateSuccessors from "./mutateSuccessors";
import optimizeLocally from "./optimizeLocally";

const nextIteration = (population) => {
  // selection
  const beforeSelection = new Date();
  const parents = selection(population);
  const afterSelection = new Date();

  // generating successors
  const beforeCreatingSuccessors = new Date();
  const successors = createSuccessors(parents);
  const afterCreatingSuccessors = new Date();

  // mutate successors
  const beforeMutationSuccessors = new Date();
  const mutatedSuccessors = mutateSuccessors(successors);
  const afterMutatingSuccessors = new Date();

  // local optimization
  const beforeOptimizingSuccessors = new Date();
  const optimizedSuccessors = optimizeLocally(mutatedSuccessors);
  const afterOptimizingSuccessors = new Date();

  const metaData = {
    selectionDiff: afterSelection - beforeSelection,
    creatingSuccessorsDiff: afterCreatingSuccessors - beforeCreatingSuccessors,
    mutatingSuccessorsDiff: afterMutatingSuccessors - beforeMutationSuccessors,
    optimizingSuccessorsDiff:
      afterOptimizingSuccessors - beforeOptimizingSuccessors,
    generalDiff: afterOptimizingSuccessors - beforeSelection,
  };

  // returning new population and meta data
  return [optimizedSuccessors, metaData];
};

export default nextIteration;
