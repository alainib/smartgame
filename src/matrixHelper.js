import gridl from "gridl";

// permet d'enlever les lignes ou les colonnes entièrement composées de 0
export function removeEmpty(array) {
  array.forEach(function(a, i, allA) {
    if (!a.includes(1)) {
      allA.splice(i, 1);
    }
  });
  return array;
}

export function rotateRight(array) {
  let result = [];
  array.forEach(function(a, i, aa) {
    a.forEach(function(b, j, bb) {
      result[bb.length - j - 1] = result[bb.length - j - 1] || [];
      result[bb.length - j - 1][i] = b;
    });
  });
  result = removeEmpty(result);
  return result;
}

export function rotateLeft(array) {
  let result = [];
  array.forEach(function(a, i, aa) {
    a.forEach(function(b, j, bb) {
      result[j] = result[j] || [];
      result[j][aa.length - i - 1] = b;
    });
  });
  result = removeEmpty(result);
  return result;
}
export function flipX(array) {
  let result = gridl(array)
    .flipX() // mirror the grid on the x-axis
    .data(); // export the data array
  return removeEmpty(result);
}
export function flipY(array) {
  let result = gridl(array)
    .flipY() // mirror the grid on the y-axis
    .data(); // export the data array
  return removeEmpty(result);
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
  for (let i in brick) {
    max = brick[i].length > max ? brick[i].length : max;
  }
  return max;
}

export function getXLength(brick) {
  return brick.length;
}
