import { isArray } from "lodash";
import { randomPop2Items } from "../utils";

const selection = (population) => {
  const gladiatorsArr = [...population];

  const newPopulation = [];
  while (gladiatorsArr.length !== 0) {
    const gladiators = randomPop2Items(gladiatorsArr);
    if (!isArray(gladiators)) {
      if (gladiators) {
        // only one
        newPopulation.push(gladiators);
      }
      continue;
    }

    const [g1, g2] = gladiators;
    const winner = g1.fitnessValue < g2.fitnessValue ? g1 : g2;
    newPopulation.push(winner);
  }

  return [...newPopulation, ...newPopulation];
};

export default selection;
