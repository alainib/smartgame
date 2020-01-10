import gridl from "gridl";

export function rotateRight(array) {
  var result = [];
  array.forEach(function(a, i, aa) {
    a.forEach(function(b, j, bb) {
      result[bb.length - j - 1] = result[bb.length - j - 1] || [];
      result[bb.length - j - 1][i] = b;
    });
  });
  return result;
}

export function rotateLeft(array) {
  var result = [];
  array.forEach(function(a, i, aa) {
    a.forEach(function(b, j, bb) {
      result[j] = result[j] || [];
      result[j][aa.length - i - 1] = b;
    });
  });
  return result;
}
export function flipX(array) {
  return gridl(array)
    .flipX() // mirror the grid on the y-axis
    .data(); // export the data array
}
export function flipY(array) {
  return gridl(array)
    .flipY() // mirror the grid on the y-axis
    .data(); // export the data array
}
/**
 * découpe une sous matrice dans brick
 * @param {*} brick
 * @param {*} start_y position y à partir de laquel couper
 * @param {*} start_x position x à partir de laquel couper
 * @param {*} y_size
 * @param {*} x_size :
 */
export function getSub(brick, start_x, start_y, x_size, y_size) {
  // https://stackoverflow.com/questions/52313225/how-to-extract-submatrix-matrix-a-matrix
  return brick.filter((_, i) => i >= start_x && i < start_x + x_size).map(a => a.slice(start_y, start_y + y_size));
}
export function getYLength(brick) {
  let max = 0;
  for (var i in brick) {
    max = brick[i].length > max ? brick[i].length : max;
  }
  return max;
}

export function getXLength(brick) {
  return brick.length;
}
