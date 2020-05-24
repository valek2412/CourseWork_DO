import { cloneDeep, times, sample } from "lodash";
import { filterObjectByValue } from "core/helpers";
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
    this.#defineSuites();
    this.calculateComplexities();
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

  #defineSuites = () => {
    this.suites = this.tests.reduce(
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
  };

  calculateComplexities = () => {
    if (!this.suites.size) return;
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

  randomizeSuites = (suitsTotalCount) => {
    // in each category should be equal numbers of suits
    const suiteCountPerCategory = this.totalQuestions / suitsTotalCount;

    const transposedTests = this.#transposeTests();

    transposedTests.forEach((categoryTests) => {
      const suites = {};
      times(suitsTotalCount, (i) => {
        suites[i + 1] = suiteCountPerCategory;
      });
      categoryTests.forEach((test) => {
        const permittedSuites = filterObjectByValue(suites, (val) => val > 0);
        const randomSuite = sample(Object.keys(permittedSuites));
        // eslint-disable-next-line no-param-reassign
        test.suite = randomSuite;
        suites[randomSuite]--;
      });
    });

    this.#defineSuites();
    this.calculateComplexities();
  };

  /**
   *
   FROM [
   [1,2,3],
   [1,2,3],
   [1,2,3],
   ]
   TO
   [
   [1,1,1],
   [2,2,2],
   [3,3,3],
   ]
   */
  #transposeTests = () =>
    this.tests[0].map((col, i) => this.tests.map((row) => row[i]));
}

export default State;
