import Test from "./test";

class State {
  tests = null;

  totalQuestions = null;

  totalCategories = null;

  totalCost = 0;

  sets = null;

  constructor(tests) {
    this.tests = tests;
    this.totalQuestions = tests.length;
    this.totalCategories = tests[0].length;
    this.totalCost = tests.reduce(
      (sum, questionTests) =>
        sum +
        questionTests.reduce((questionSum, test) => questionSum + test.cost, 0),
      0
    );
    this.sets = tests.reduce(
      (set, questionTests) =>
        new Set([
          ...questionTests.reduce(
            (qSet, test) => new Set([...qSet, test.set]),
            new Set()
          ),
          ...set,
        ]),
      new Set()
    );
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
}

export default State;
