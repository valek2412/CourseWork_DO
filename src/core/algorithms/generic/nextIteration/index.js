import selection from "./selection";
import createSuccessors from "./createSuccessors";
import mutateSuccessors from "./mutateSuccessors";
import optimizeLocally from "./optimizeLocally";

const nextIteration = (population) => {
  // selection
  const parents = selection(population);
  // generating successors
  const successors = createSuccessors(parents);
  // mutate successors
  const mutatedSuccessors = mutateSuccessors(successors);
  // local optimization
  const optimizedSuccessors = optimizeLocally(mutatedSuccessors);

  // returning new population
  return optimizedSuccessors;
};

export default nextIteration;
