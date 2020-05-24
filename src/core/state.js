import { cloneDeep } from "lodash";
import Test from "./test";

class State {
  tests = null;

  totalQuestions = null;

  totalCategories = null;

  totalComplexity = null;

  suites = null;

  suiteComplexities = null;

  fitnessValue = null;

  constructor(_tests) {
    const firstTest = _tests[0][0];
    const isSkeleton = typeof firstTest === "number";
    if (!isSkeleton && !firstTest) {
      throw new Error("Invalid tests");
    }
    const tests = isSkeleton
      ? _tests.map((questionTests) =>
          questionTests.map((complexity) => new Test(complexity))
        )
      : _tests;
    this.tests = tests;
    this.totalQuestions = tests.length;
    this.totalCategories = tests[0].length;
    this.suites = tests.reduce(
      (suites, questionTests) =>
        new Set([
          ...questionTests.reduce(
            (qSuites, test) => new Set([...qSuites, test.suite]),
            new Set()
          ),
          ...suites,
        ]),
      new Set()
    );

    if (this.suites.size) this.calculateComplexities();
  }

  static initSample() {
    const [YELLOW, GREEN] = [1, 2];
    const tests = [
      // 1 category                2 category
      [new Test(3, YELLOW), new Test(2, YELLOW)], // 1 question
      [new Test(1, YELLOW), new Test(7, YELLOW)], // 2 question
      [new Test(9, GREEN), new Test(5, GREEN)], // 3 question
      [new Test(2, GREEN), new Test(6, GREEN)], // 4 question
    ];
    return new State(tests);
  }

  calculateComplexities = () => {
    const complexities = new Map();

    let totalComplexity = 0;

    this.suites.forEach((suite) => {
      const complexity = this.#calcSuiteComplexity(suite);
      complexities.set(suite, complexity);
      totalComplexity += complexity;
    });

    this.suiteComplexities = complexities;
    this.totalComplexity = totalComplexity;
    this.fitnessValue = this.#fitness();
  };

  #calcSuiteComplexity = (suite) =>
    this.tests.reduce(
      (sum, questionTests) =>
        sum +
        questionTests.reduce((questionSum, test) => {
          if (test.suite !== suite) return questionSum;
          return questionSum + test.complexity;
        }, 0),
      0
    );

  #fitness = () => {
    const complexityArr = [...this.suiteComplexities.values()].sort();
    return Math.abs(complexityArr[0] - complexityArr[complexityArr.length - 1]);
  };

  clone = () => {
    const tests = cloneDeep(this.tests);
    return new State(tests);
  };
}

export default State;
