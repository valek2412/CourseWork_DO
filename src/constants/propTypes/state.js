import PropTypes from "prop-types";
import TestPropType from "./test";

const StatePropType = {
  tests: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape(TestPropType))),
  totalQuestions: PropTypes.number,
  totalCategories: PropTypes.number,
  totalComplexity: PropTypes.number,
  suites: PropTypes.instanceOf(Set),
  suiteComplexities: PropTypes.instanceOf(Map),
  fitnessValue: PropTypes.number,
};

export default StatePropType;
