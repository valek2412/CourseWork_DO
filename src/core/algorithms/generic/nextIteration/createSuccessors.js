import { isArray, random } from "lodash";
import State from "core/state";
import { randomPop2Items } from "../utils";

const getGenesByCrossoverDot = (parent, crossoverDot) => {
  const transponatedMatrix = parent.transposeTests();

  const firstGene = transponatedMatrix.slice(0, crossoverDot);
  const secondGene = transponatedMatrix.slice(crossoverDot);
  return [firstGene, secondGene];
};

const createSuccessor = (firstGene, secondGene) => {
  const transponatedMatrix = [...firstGene, ...secondGene];
  return new State(transponatedMatrix, true);
};

const createSuccessors = (_parents) => {
  const parents = [..._parents];
  // panmixia: get random 2 parents
  const successors = [];
  while (parents.length !== 0) {
    const selectedParents = randomPop2Items(parents);
    if (!selectedParents) continue;
    if (!isArray(selectedParents)) {
      if (selectedParents) {
        // only one
        successors.push(...selectedParents);
      }
      continue;
    }

    //  single point crossover
    const [p1, p2] = selectedParents;
    const crossoverDot = random(p1.totalCategories - 1);
    const [p1g1, p1g2] = getGenesByCrossoverDot(p1, crossoverDot);
    const [p2g1, p2g2] = getGenesByCrossoverDot(p2, crossoverDot);
    const newSuccessors = [
      createSuccessor(p1g1, p2g2),
      createSuccessor(p1g2, p2g1),
    ];
    successors.push(...newSuccessors);
  }

  return successors;
};

export default createSuccessors;
