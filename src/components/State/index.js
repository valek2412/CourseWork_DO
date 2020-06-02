import React from "react";
import PropTypes from "prop-types";

import StatePropType from "constants/propTypes/state";

const State = ({ state }) => (
  <div>
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Категорії; Фітнес-функція: {state.fitnessValue}</th>
          {Array.from({ length: state.totalCategories }, (v, i) => i + 1).map(
            (j) => (
              <th scope="col" key={String(j)}>
                Категорія {j}
              </th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {state.tests.map((questionTests, i) => (
          <tr key={String(i)}>
            <th scope="row">Запитання {i + 1}</th>
            {questionTests.map((test, j) => (
              <td
                key={String(`${i}_${j}`)}
                style={{ backgroundColor: state.getColor(test.suite) }}
              >
                {test.complexity}
                <span className="ml-3 badge badge-primary">{test.suite}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

    {state.suiteComplexities && (
      <table className="mt-2 table">
        <thead>
          <tr>
            <th scope="col">Номер набору тестів</th>
            {Array.from(
              { length: state.suiteComplexities.size },
              (v, i) => i + 1
            ).map((j) => (
              <th scope="col" key={String(j)}>
                Набір тестів {j}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Складність</th>
            {[...state.suiteComplexities]
              .sort((a, b) => a.complexity - b.complexity)
              .map(([suite, complexity]) => (
                <td key={String(suite)}>{complexity}</td>
              ))}
          </tr>
        </tbody>
      </table>
    )}
  </div>
);

State.propTypes = {
  state: PropTypes.shape(StatePropType).isRequired,
};

export default State;
