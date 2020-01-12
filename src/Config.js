const baseSize = {
  x: 11,
  y: 5
};

const bricks = {
  a: {
    color: "orange",
    matrix: [
      [0, 1],
      [0, 1],
      [1, 1]
    ]
  },

  b: {
    color: "red",
    matrix: [
      [0, 1],
      [1, 1],
      [1, 1]
    ]
  },
  c: {
    color: "blue",
    matrix: [
      [0, 1],
      [0, 1],
      [0, 1],
      [1, 1]
    ]
  },

  d: {
    color: "lightsalmon",
    matrix: [
      [0, 1],
      [0, 1],
      [1, 1],
      [0, 1],
      [0, 0]
    ]
  },
  e: {
    color: "green",
    matrix: [
      [0, 1],
      [0, 1],
      [1, 1],
      [1, 0]
    ]
  },
  f: {
    color: "white",
    matrix: [
      [0, 1],
      [1, 1]
    ]
  },

  g: {
    color: "deepskyblue",
    matrix: [
      [0, 0, 1],
      [0, 0, 1],
      [1, 1, 1]
    ]
  },
  h: {
    color: "magenta",
    matrix: [
      [0, 0, 1],
      [0, 1, 1],
      [1, 1, 0]
    ]
  },
  i: {
    color: "yellow",
    matrix: [
      [1, 0, 1],
      [1, 1, 1]
    ]
  },

  j: {
    color: "darkslateblue",
    matrix: [[1], [1], [1], [1]]
  },
  k: {
    color: "greenyellow",
    matrix: [
      [1, 1],
      [1, 1]
    ]
  },
  l: {
    color: "#b8b4b4",
    matrix: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0]
    ]
  }
};

const preloadedBase = {
  alain: {
    baseData: [
      ["k", "k", false, false, false, false, false, false, false, false, false],
      ["k", "k", false, false, false, false, false, false, false, false, "c"],
      ["i", "i", "f", "a", false, false, false, false, false, "h", "c"],
      ["i", "f", "f", "a", false, false, false, false, "h", "h", "c"],
      ["i", "i", "a", "a", false, false, false, "h", "h", "c", "c"]
    ],
    bricksPositions: [
      {
        color: "blue",
        matrix: [
          [0, 1],
          [0, 1],
          [0, 1],
          [1, 1]
        ],
        name: "c",
        position: {
          x: 1,
          y: 9
        }
      },
      {
        color: "magenta",
        matrix: [
          [0, 0, 1],
          [0, 1, 1],
          [1, 1, 0]
        ],
        name: "h",
        position: {
          x: 2,
          y: 7
        }
      },
      {
        color: "yellow",
        matrix: [
          [1, 1],
          [1, 0],
          [1, 1]
        ],
        name: "i",
        position: {
          x: 2,
          y: 0
        }
      },
      {
        color: "white",
        matrix: [
          [0, 1],
          [1, 1]
        ],
        name: "f",
        position: {
          x: 2,
          y: 1
        }
      },
      {
        color: "orange",
        matrix: [
          [0, 1],
          [0, 1],
          [1, 1]
        ],
        name: "a",
        position: {
          x: 2,
          y: 2
        }
      },
      {
        color: "greenyellow",
        matrix: [
          [1, 1],
          [1, 1]
        ],
        name: "k",
        position: {
          x: 0,
          y: 0
        }
      }
    ],
    usedLetters: ["c", "h", "i", "f", "a", "k"]
  }
};
export default {
  baseSize,
  bricks,
  preloadedBase
};

/*
const _bricks = {
  a: {
    color: "orange",
    matrix: [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  },

  b: {
    color: "red",
    matrix: [
      [0, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  },
  c: {
    color: "blue",
    matrix: [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  },

  d: {
    color: "lightsalmon",
    matrix: [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  },
  e: {
    color: "green",
    matrix: [
      [0, 1, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  },
  f: {
    color: "white",
    matrix: [
      [0, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  },

  g: {
    color: "deepskyblue",
    matrix: [
      [0, 0, 1, 0, 0],
      [0, 0, 1, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  },
  h: {
    color: "magenta",
    matrix: [
      [0, 0, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  },
  i: {
    color: "yellow",
    matrix: [
      [1, 0, 1, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  },

  j: {
    color: "darkslateblue",
    matrix: [
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [1, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  },
  k: {
    color: "greenyellow",
    matrix: [
      [1, 1, 0, 0, 0],
      [1, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  },
  l: {
    color: "grey",
    matrix: [
      [0, 1, 0, 0, 0],
      [1, 1, 1, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ]
  }
};*/
