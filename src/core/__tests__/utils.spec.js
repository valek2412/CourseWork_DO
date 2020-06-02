import { transposeMatrix } from "../utils";

describe("transpose functions", () => {
  describe("transposeMatrix", () => {
    it("should be valid", () => {
      const input = [
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
      ];

      const output = [
        [1, 1, 1],
        [2, 2, 2],
        [3, 3, 3],
      ];
      const transposedMatrix = transposeMatrix(input);
      expect(transposedMatrix).toEqual(output);
    });
    it("no changes", () => {
      const input = [
        [1, 2, 3],
        [1, 2, 3],
        [1, 2, 3],
      ];

      expect(input |> transposeMatrix |> transposeMatrix).toEqual(input);
    });
  });
});
