import gridl from "gridl";

// permet d'enlever les lignes ou les colonnes entièrement composées de 0
export function removeEmpty(matrix) {
  matrix.forEach(function(a, i, allA) {
    if (!a.includes(1)) {
      allA.splice(i, 1);
    }
  });
  return matrix;
}

export function rotateRight(matrix) {
  let result = [];
  matrix.forEach(function(a, i, aa) {
    a.forEach(function(b, j, bb) {
      result[bb.length - j - 1] = result[bb.length - j - 1] || [];
      result[bb.length - j - 1][i] = b;
    });
  });
  // result = removeEmpty(result);
  return result;
}

export function rotateLeft(matrix) {
  let result = [];
  matrix.forEach(function(a, i, aa) {
    a.forEach(function(b, j, bb) {
      result[j] = result[j] || [];
      result[j][aa.length - i - 1] = b;
    });
  });
  // result = removeEmpty(result);
  return result;
}

export function flipX(matrix) {
  let result = gridl(matrix)
    .flipX() // mirror the grid on the x-axis
    .data(); // export the data matrix
  return result;
  // return removeEmpty(result);
}

export function flipY(matrix) {
  let result = gridl(matrix)
    .flipY() // mirror the grid on the y-axis
    .data(); // export the data matrix
  return result;
  // return removeEmpty(result);
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

/**
 *  retourne toutes les positions possible d'une matrix
 * il faut faire 4 rotations dans le sens que le l'on, puis faire flipY puis encore 4 rotations,
 * certaines formes n'ont que 2 sol possibles, d'autre jusqu'à 8
 * @param {*} matrix
 */
export function computeAllPosition(matrix) {
  let resSet = new Set(); // utilise un set pour éviter les doublons, les matrix seront ajoutées en string
  resSet.add(JSON.stringify(matrix));
  for (let i = 0; i < 3; i++) {
    matrix = rotateLeft(matrix);
    resSet.add(JSON.stringify(matrix));
  }
  matrix = flipY(matrix);
  resSet.add(JSON.stringify(matrix));
  for (let i = 0; i < 3; i++) {
    matrix = rotateLeft(matrix);
    resSet.add(JSON.stringify(matrix));
  }
  let res = [];
  for (let item of resSet) {
    res.push(JSON.parse(item));
  }
  return res;
}

/**
 * manipulation de brick sur la base du plateau
 */

// check si on peut mettre la brick à la position (x,y) sur baseMatrix . il faut que la place soit vide ou contienne la brick elle meme qui est en cour de déplacement pour le coup
export function canSetBrick(baseMatrix, subMatrix, name, x, y) {
  const log = false;

  log &&
    console.log({
      baseMatrix,
      subMatrix,
      x,
      y
    });
  let can = true;
  // on test que la brick ne depasse pas du base

  const brickSize = {
    x: getXLength(subMatrix),
    y: getYLength(subMatrix)
  };
  const baseSize = {
    x: getXLength(baseMatrix),
    y: getYLength(baseMatrix)
  };

  if (x + brickSize.x > baseSize.x) {
    log && console.error("canSetBrick error x");
    log && console.log({ x, "brickSize.x": brickSize.x, "baseSize.x": baseSize.x, res: x + brickSize.x > baseSize.x });
    return false;
  }

  if (y + brickSize.y > baseSize.y) {
    log && console.error("canSetBrick error y");
    log && console.log({ y, "brickSize.y": brickSize.y, "baseSize.y": baseSize.y, res: y + brickSize.y > baseSize.y });
    return false;
  }

  // on crop une sous matrix de taille identique à brick dans baseMatrix, plus facile pour comparer
  const sub = getSub(baseMatrix, x, y, brickSize.x, brickSize.y);

  if (sub.length === 0) {
    console.error("error getsub");
    console.log(sub, subMatrix);
    console.log({
      baseMatrix,
      x,
      y,
      brickSize
    });
  } else {
    for (var i = 0; i < brickSize.x; i++) {
      for (var j = 0; j < brickSize.y; j++) {
        if (subMatrix[i][j] === 1 && sub[i][j] !== name) {
          if (sub[i][j] !== false) {
            can = false;
          }
        }
      }
    }
  }

  return can;
}

export function resolve(baseMatrix, unusedBricks, usedLetters, bricksPositions) {
  const baseSize = {
    x: getXLength(baseMatrix),
    y: getYLength(baseMatrix)
  };

  function setBrickAt(baseMatrix, brickMatrix, name, l, c) {
    const brickSize = {
      x: getXLength(brickMatrix),
      y: getYLength(brickMatrix)
    };

    for (let i = 0; i < brickSize.x; i++) {
      for (let j = 0; j < brickSize.y; j++) {
        try {
          if (brickMatrix[i][j] === 1) {
            baseMatrix[i + l][j + c] = name;
          }
        } catch (error) {
          console.log({ i, j, l, c, baseMatrix });
          console.error(error);
        }
      }
    }

    /* this.setState((prevState, props) => ({
      usedLetters: [...prevState.usedLetters, name],
      bricksPositions: [...prevState.bricksPositions, { ...brick, matrix: brick.matrix, name, position: { l, c } }],
      baseData
    })); */
  }

  console.log("resolve", baseMatrix, baseSize, unusedBricks);
  return new Promise(function(resolve, reject) {
    // Pour chaque brick non positionées sur la base
    for (let b in unusedBricks) {
      let brick = unusedBricks[b];

      //  on vas essayer de la placer dans une de ses variantes tournées/flipées.
      for (let m in brick.allMatrix) {
        let matrix = brick.allMatrix[m];
        for (let l = 0; l < baseSize.x; l++) {
          for (let c = 0; c < baseSize.y; c++) {
            // if (baseMatrix[l][c] === false) {
            if (canSetBrick(baseMatrix, matrix, brick.name, l, c, false)) {
              setBrickAt(baseMatrix, matrix, brick.name, l, c);

              usedLetters.push(brick.name);
              bricksPositions.push({
                ...brick,
                matrix,
                name: brick.name,
                position: { l, c }
              });
              brick["used"] = true;
              let remaning = unusedBricks.filter(elem => {
                return !elem.used;
              });
              console.log("remaning.length", remaning.length);
              if (remaning.length === 0) {
                resolve({
                  usedLetters,
                  bricksPositions,
                  baseMatrix
                });
              }
            }
            //}
          }
        }
      }
    }
  });
}
