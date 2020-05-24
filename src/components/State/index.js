import React from "react";
import DataState from "core/state";

const State = () => {
  const state = DataState.initSample();
  return (
    <table className="table">
      <thead>
        <tr>
          <th scope="col">Запитання / Категорії</th>
          {Array.from({ length: state.totalCategories }, (v, i) => i + 1).map(
            (j) => (
              <th scope="col">Категорія {j}</th>
            )
          )}
        </tr>
      </thead>
      <tbody>
        {state.tests.map((questionTests, i) => (
          <tr>
            <th scope="row">Запитання {i + 1}</th>
            {questionTests.map((test) => (
              <td>
                {test.complexity}
                <span className="ml-3 badge badge-primary">{test.suite}</span>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default State;
