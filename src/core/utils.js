const transposeMatrix = (matrix) =>
  matrix[0].map((_, i) => matrix.map((row) => row[i]));

export { transposeMatrix };
