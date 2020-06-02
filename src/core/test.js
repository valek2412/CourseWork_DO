class Test {
  complexity = null;

  suite = null;

  constructor(complexity, suite) {
    this.complexity = +complexity;
    const suiteNumber = +suite;
    this.suite = Number.isNaN(suiteNumber) ? null : suiteNumber ?? null;
  }
}

export default Test;
