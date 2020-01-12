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
  33: {
    baseData: [
      ["f", "f", "d", "d", "d", "d", "e", "e", "e", false, false],
      ["f", "k", "k", "d", "l", "e", "e", false, false, false, false],
      ["g", "k", "k", "l", "l", "l", false, false, false, false, false],
      ["g", "a", "a", "a", "l", false, false, false, false, false, false],
      ["g", "g", "g", "a", false, false, false, false, false, false, false]
    ],
    bricksPositions: [
      {
        color: "white",
        matrix: [
          [1, 1],
          [1, 0]
        ],
        name: "f",
        position: { x: 0, y: 0 }
      },
      {
        color: "greenyellow",
        matrix: [
          [1, 1],
          [1, 1]
        ],
        name: "k",
        position: { x: 1, y: 1 }
      },
      {
        color: "deepskyblue",
        matrix: [
          [1, 0, 0],
          [1, 0, 0],
          [1, 1, 1]
        ],
        name: "g",
        position: { x: 2, y: 0 }
      },
      {
        color: "orange",
        matrix: [
          [1, 1, 1],
          [0, 0, 1]
        ],
        name: "a",
        position: { x: 3, y: 1 }
      },
      {
        color: "lightsalmon",
        matrix: [
          [1, 1, 1, 1],
          [0, 1, 0, 0]
        ],
        name: "d",
        position: { x: 0, y: 2 }
      },
      {
        color: "#b8b4b4",
        matrix: [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0]
        ],
        name: "l",
        position: { x: 1, y: 3 }
      },
      {
        color: "green",
        matrix: [
          [0, 1, 1, 1],
          [1, 1, 0, 0]
        ],
        name: "e",
        position: { x: 0, y: 5 }
      }
    ],
    usedLetters: ["f", "k", "g", "a", "d", "l", "e"]
  },
  34: {
    baseData: [
      ["f", "d", "d", "d", "d", "e", false, false, false, false, false],
      ["f", "f", "d", "c", "c", "e", false, false, false, false, false],
      ["g", "k", "k", "c", "e", "e", false, false, false, false, false],
      ["g", "k", "k", "c", "e", false, false, false, false, false, false],
      ["g", "g", "g", "c", "j", "j", "j", "j", false, false, false]
    ],
    bricksPositions: [
      {
        color: "white",
        matrix: [
          [1, 0],
          [1, 1]
        ],
        name: "f",
        position: { x: 0, y: 0 }
      },
      {
        color: "lightsalmon",
        matrix: [
          [1, 1, 1, 1],
          [0, 1, 0, 0]
        ],
        name: "d",
        position: { x: 0, y: 1 }
      },
      {
        color: "deepskyblue",
        matrix: [
          [1, 0, 0],
          [1, 0, 0],
          [1, 1, 1]
        ],
        name: "g",
        position: { x: 2, y: 0 }
      },
      {
        color: "greenyellow",
        matrix: [
          [1, 1],
          [1, 1]
        ],
        name: "k",
        position: { x: 2, y: 1 }
      },
      {
        color: "blue",
        matrix: [
          [1, 1],
          [1, 0],
          [1, 0],
          [1, 0]
        ],
        name: "c",
        position: { x: 1, y: 3 }
      },
      {
        color: "green",
        matrix: [
          [0, 1],
          [0, 1],
          [1, 1],
          [1, 0]
        ],
        name: "e",
        position: { x: 0, y: 4 }
      },
      { color: "darkslateblue", matrix: [[1, 1, 1, 1]], name: "j", position: { x: 4, y: 4 } }
    ],
    usedLetters: ["f", "d", "g", "k", "c", "e", "j"]
  },
  35: {
    baseData: [
      ["f", "f", "k", "k", "b", "b", false, false, false, false, false],
      ["f", "c", "k", "k", "b", "b", "b", false, false, false, false],
      ["g", "c", "c", "c", "c", "l", false, false, false, false, false],
      ["g", "e", "e", "e", "l", "l", "l", false, false, false, false],
      ["g", "g", "g", "e", "e", "l", false, false, false, false, false]
    ],
    bricksPositions: [
      {
        color: "white",
        matrix: [
          [1, 1],
          [1, 0]
        ],
        name: "f",
        position: { x: 0, y: 0 }
      },
      {
        color: "greenyellow",
        matrix: [
          [1, 1],
          [1, 1]
        ],
        name: "k",
        position: { x: 0, y: 2 }
      },
      {
        color: "blue",
        matrix: [
          [1, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        name: "c",
        position: { x: 1, y: 1 }
      },
      {
        color: "deepskyblue",
        matrix: [
          [1, 0, 0],
          [1, 0, 0],
          [1, 1, 1]
        ],
        name: "g",
        position: { x: 2, y: 0 }
      },
      {
        color: "green",
        matrix: [
          [1, 1, 1, 0],
          [0, 0, 1, 1]
        ],
        name: "e",
        position: { x: 3, y: 1 }
      },
      {
        color: "red",
        matrix: [
          [1, 1, 0],
          [1, 1, 1]
        ],
        name: "b",
        position: { x: 0, y: 4 }
      },
      {
        color: "#b8b4b4",
        matrix: [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0]
        ],
        name: "l",
        position: { x: 2, y: 4 }
      }
    ],
    usedLetters: ["f", "k", "c", "g", "e", "b", "l"]
  },
  36: {
    baseData: [
      ["f", "j", "j", "j", "j", "e", "e", false, false, false, false],
      ["f", "f", "h", "e", "e", "e", false, false, false, false, false],
      ["k", "k", "h", "h", "i", "i", false, false, false, false, false],
      ["k", "k", "d", "h", "h", "i", false, false, false, false, false],
      ["d", "d", "d", "d", "i", "i", false, false, false, false, false]
    ],
    bricksPositions: [
      {
        color: "white",
        matrix: [
          [1, 0],
          [1, 1]
        ],
        name: "f",
        position: { x: 0, y: 0 }
      },
      {
        color: "greenyellow",
        matrix: [
          [1, 1],
          [1, 1]
        ],
        name: "k",
        position: { x: 2, y: 0 }
      },
      {
        color: "lightsalmon",
        matrix: [
          [0, 0, 1, 0],
          [1, 1, 1, 1]
        ],
        name: "d",
        position: { x: 3, y: 0 }
      },
      { color: "darkslateblue", matrix: [[1, 1, 1, 1]], name: "j", position: { x: 0, y: 1 } },
      {
        color: "magenta",
        matrix: [
          [1, 0, 0],
          [1, 1, 0],
          [0, 1, 1]
        ],
        name: "h",
        position: { x: 1, y: 2 }
      },
      {
        color: "yellow",
        matrix: [
          [1, 1],
          [0, 1],
          [1, 1]
        ],
        name: "i",
        position: { x: 2, y: 4 }
      },
      {
        color: "green",
        matrix: [
          [0, 0, 1, 1],
          [1, 1, 1, 0]
        ],
        name: "e",
        position: { x: 0, y: 3 }
      }
    ],
    usedLetters: ["f", "k", "d", "j", "h", "i", "e"]
  },
  37: {
    baseData: [
      ["f", "c", "c", "c", "c", "g", "g", "g", false, false, false],
      ["f", "f", "b", "b", "c", "g", false, false, false, false, false],
      ["k", "k", "b", "b", "l", "g", false, false, false, false, false],
      ["k", "k", "b", "l", "l", "l", false, false, false, false, false],
      ["j", "j", "j", "j", "l", false, false, false, false, false, false]
    ],
    bricksPositions: [
      {
        color: "white",
        matrix: [
          [1, 0],
          [1, 1]
        ],
        name: "f",
        position: { x: 0, y: 0 }
      },
      {
        color: "blue",
        matrix: [
          [1, 1, 1, 1],
          [0, 0, 0, 1]
        ],
        name: "c",
        position: { x: 0, y: 1 }
      },
      {
        color: "greenyellow",
        matrix: [
          [1, 1],
          [1, 1]
        ],
        name: "k",
        position: { x: 2, y: 0 }
      },
      {
        color: "red",
        matrix: [
          [1, 1],
          [1, 1],
          [1, 0]
        ],
        name: "b",
        position: { x: 1, y: 2 }
      },
      { color: "darkslateblue", matrix: [[1, 1, 1, 1]], name: "j", position: { x: 4, y: 0 } },
      {
        color: "#b8b4b4",
        matrix: [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0]
        ],
        name: "l",
        position: { x: 2, y: 3 }
      },
      {
        color: "deepskyblue",
        matrix: [
          [1, 1, 1],
          [1, 0, 0],
          [1, 0, 0]
        ],
        name: "g",
        position: { x: 0, y: 5 }
      }
    ],
    usedLetters: ["f", "c", "k", "b", "j", "l", "g"]
  },
  38: {
    baseData: [
      ["f", "f", "j", "j", "j", "j", false, false, false, false, false],
      ["f", "d", "d", "d", "d", false, false, false, false, false, false],
      ["k", "k", "g", "d", "a", false, false, false, false, false, false],
      ["k", "k", "g", "c", "a", "a", "a", false, false, false, false],
      ["g", "g", "g", "c", "c", "c", "c", false, false, false, false]
    ],
    bricksPositions: [
      {
        color: "white",
        matrix: [
          [1, 1],
          [1, 0]
        ],
        name: "f",
        position: { x: 0, y: 0 }
      },
      {
        color: "greenyellow",
        matrix: [
          [1, 1],
          [1, 1]
        ],
        name: "k",
        position: { x: 2, y: 0 }
      },
      {
        color: "deepskyblue",
        matrix: [
          [0, 0, 1],
          [0, 0, 1],
          [1, 1, 1]
        ],
        name: "g",
        position: { x: 2, y: 0 }
      },
      {
        color: "lightsalmon",
        matrix: [
          [1, 1, 1, 1, 0],
          [0, 0, 1, 0, 0]
        ],
        name: "d",
        position: { x: 1, y: 1 }
      },
      { color: "darkslateblue", matrix: [[1, 1, 1, 1]], name: "j", position: { x: 0, y: 2 } },
      {
        color: "blue",
        matrix: [
          [1, 0, 0, 0],
          [1, 1, 1, 1]
        ],
        name: "c",
        position: { x: 3, y: 3 }
      },
      {
        color: "orange",
        matrix: [
          [1, 0, 0],
          [1, 1, 1]
        ],
        name: "a",
        position: { x: 2, y: 4 }
      }
    ],
    usedLetters: ["f", "k", "g", "d", "j", "c", "a"]
  },
  39: {
    baseData: [
      ["f", "f", "k", "k", "i", "i", "i", false, false, false, false],
      ["c", "f", "k", "k", "i", "g", "i", false, false, false, false],
      ["c", "j", "j", "j", "j", "g", false, false, false, false, false],
      ["c", "e", "e", "g", "g", "g", false, false, false, false, false],
      ["c", "c", "e", "e", "e", false, false, false, false, false, false]
    ],
    bricksPositions: [
      {
        color: "white",
        matrix: [
          [1, 1],
          [0, 1]
        ],
        name: "f",
        position: { x: 0, y: 0 }
      },
      {
        color: "greenyellow",
        matrix: [
          [1, 1],
          [1, 1]
        ],
        name: "k",
        position: { x: 0, y: 2 }
      },
      {
        color: "yellow",
        matrix: [
          [1, 1, 1],
          [1, 0, 1]
        ],
        name: "i",
        position: { x: 0, y: 4 }
      },
      {
        color: "blue",
        matrix: [
          [1, 0],
          [1, 0],
          [1, 0],
          [1, 1]
        ],
        name: "c",
        position: { x: 1, y: 0 }
      },
      { color: "darkslateblue", matrix: [[1, 1, 1, 1]], name: "j", position: { x: 2, y: 1 } },
      {
        color: "green",
        matrix: [
          [1, 1, 0, 0],
          [0, 1, 1, 1]
        ],
        name: "e",
        position: { x: 3, y: 1 }
      },
      {
        color: "deepskyblue",
        matrix: [
          [0, 0, 1],
          [0, 0, 1],
          [1, 1, 1]
        ],
        name: "g",
        position: { x: 1, y: 3 }
      }
    ],
    usedLetters: ["f", "k", "i", "c", "j", "e", "g"]
  },
  40: {
    baseData: [
      ["f", "f", "d", "d", "d", "d", false, false, false, false, false],
      ["f", "k", "k", "d", "h", "h", false, false, false, false, false],
      ["a", "k", "k", "h", "h", "l", false, false, false, false, false],
      ["a", "e", "e", "h", "l", "l", "l", false, false, false, false],
      ["a", "a", "e", "e", "e", "l", false, false, false, false, false]
    ],
    bricksPositions: [
      {
        color: "white",
        matrix: [
          [1, 1],
          [1, 0]
        ],
        name: "f",
        position: { x: 0, y: 0 }
      },
      {
        color: "greenyellow",
        matrix: [
          [1, 1],
          [1, 1]
        ],
        name: "k",
        position: { x: 1, y: 1 }
      },
      {
        color: "orange",
        matrix: [
          [1, 0],
          [1, 0],
          [1, 1]
        ],
        name: "a",
        position: { x: 2, y: 0 }
      },
      {
        color: "green",
        matrix: [
          [1, 1, 0, 0],
          [0, 1, 1, 1]
        ],
        name: "e",
        position: { x: 3, y: 1 }
      },
      {
        color: "lightsalmon",
        matrix: [
          [1, 1, 1, 1],
          [0, 1, 0, 0]
        ],
        name: "d",
        position: { x: 0, y: 2 }
      },
      {
        color: "magenta",
        matrix: [
          [0, 1, 1],
          [1, 1, 0],
          [1, 0, 0]
        ],
        name: "h",
        position: { x: 1, y: 3 }
      },
      {
        color: "#b8b4b4",
        matrix: [
          [0, 1, 0],
          [1, 1, 1],
          [0, 1, 0]
        ],
        name: "l",
        position: { x: 2, y: 4 }
      }
    ],
    usedLetters: ["f", "k", "a", "e", "d", "h", "l"]
  },
  41: {
    baseData: [
      ["i", "i", "i", "d", "d", "d", "d", false, false, false, false],
      ["i", "e", "i", "f", "d", false, false, false, false, false, false],
      ["e", "e", "f", "f", false, false, false, false, false, false, false],
      ["e", "a", "a", "a", false, false, false, false, false, false, false],
      ["e", "a", "j", "j", "j", "j", false, false, false, false, false]
    ],
    bricksPositions: [
      {
        color: "yellow",
        matrix: [
          [1, 1, 1],
          [1, 0, 1]
        ],
        name: "i",
        position: { x: 0, y: 0 }
      },
      {
        color: "green",
        matrix: [
          [0, 1],
          [1, 1],
          [1, 0],
          [1, 0]
        ],
        name: "e",
        position: { x: 1, y: 0 }
      },
      {
        color: "orange",
        matrix: [
          [1, 1, 1],
          [1, 0, 0]
        ],
        name: "a",
        position: { x: 3, y: 1 }
      },
      {
        color: "white",
        matrix: [
          [0, 1],
          [1, 1]
        ],
        name: "f",
        position: { x: 1, y: 2 }
      },
      { color: "darkslateblue", matrix: [[1, 1, 1, 1]], name: "j", position: { x: 4, y: 2 } },
      {
        color: "lightsalmon",
        matrix: [
          [1, 1, 1, 1],
          [0, 1, 0, 0]
        ],
        name: "d",
        position: { x: 0, y: 3 }
      }
    ],
    usedLetters: ["i", "e", "a", "f", "j", "d"]
  },
  42: {
    baseData: [
      ["i", "i", "i", "a", "d", false, false, false, false, false, false],
      ["i", "b", "i", "a", "d", "d", false, false, false, false, false],
      ["b", "b", "a", "a", "d", false, false, false, false, false, false],
      ["b", "b", "e", "e", "d", false, false, false, false, false, false],
      ["e", "e", "e", "j", "j", "j", "j", false, false, false, false]
    ],
    bricksPositions: [
      {
        color: "yellow",
        matrix: [
          [1, 1, 1],
          [1, 0, 1]
        ],
        name: "i",
        position: { x: 0, y: 0 }
      },
      {
        color: "red",
        matrix: [
          [0, 1],
          [1, 1],
          [1, 1]
        ],
        name: "b",
        position: { x: 1, y: 0 }
      },
      {
        color: "green",
        matrix: [
          [0, 0, 1, 1],
          [1, 1, 1, 0]
        ],
        name: "e",
        position: { x: 3, y: 0 }
      },
      {
        color: "orange",
        matrix: [
          [0, 1],
          [0, 1],
          [1, 1]
        ],
        name: "a",
        position: { x: 0, y: 2 }
      },
      {
        color: "lightsalmon",
        matrix: [
          [1, 0],
          [1, 1],
          [1, 0],
          [1, 0]
        ],
        name: "d",
        position: { x: 0, y: 4 }
      },
      { color: "darkslateblue", matrix: [[1, 1, 1, 1]], name: "j", position: { x: 4, y: 3 } }
    ],
    usedLetters: ["i", "b", "e", "a", "d", "j"]
  },
  43: {
    baseData: [
      ["i", "i", "j", "j", "j", "j", false, false, false, false, false],
      ["i", "d", "d", "d", "d", false, false, false, false, false, false],
      ["i", "i", "a", "d", "g", false, false, false, false, false, false],
      ["a", "a", "a", "c", "g", false, false, false, false, false, false],
      ["c", "c", "c", "c", "g", "g", "g", false, false, false, false]
    ],
    bricksPositions: [
      {
        color: "yellow",
        matrix: [
          [1, 1],
          [1, 0],
          [1, 1]
        ],
        name: "i",
        position: { x: 0, y: 0 }
      },
      { color: "darkslateblue", matrix: [[1, 1, 1, 1]], name: "j", position: { x: 0, y: 2 } },
      {
        color: "orange",
        matrix: [
          [0, 0, 1],
          [1, 1, 1]
        ],
        name: "a",
        position: { x: 2, y: 0 }
      },
      {
        color: "blue",
        matrix: [
          [0, 0, 0, 1],
          [1, 1, 1, 1]
        ],
        name: "c",
        position: { x: 3, y: 0 }
      },
      {
        color: "lightsalmon",
        matrix: [
          [1, 1, 1, 1, 0],
          [0, 0, 1, 0, 0]
        ],
        name: "d",
        position: { x: 1, y: 1 }
      },
      {
        color: "deepskyblue",
        matrix: [
          [1, 0, 0],
          [1, 0, 0],
          [1, 1, 1]
        ],
        name: "g",
        position: { x: 2, y: 4 }
      }
    ],
    usedLetters: ["i", "j", "a", "c", "d", "g"]
  },
  44: {
    baseData: [
      ["i", "i", "d", "d", "d", "d", false, false, false, false, false],
      ["i", "e", "e", "e", "d", false, false, false, false, false, false],
      ["i", "i", "f", "e", "e", false, false, false, false, false, false],
      ["a", "f", "f", "k", "k", false, false, false, false, false, false],
      ["a", "a", "a", "k", "k", false, false, false, false, false, false]
    ],
    bricksPositions: [
      {
        color: "yellow",
        matrix: [
          [1, 1],
          [1, 0],
          [1, 1]
        ],
        name: "i",
        position: { x: 0, y: 0 }
      },
      {
        color: "green",
        matrix: [
          [1, 1, 1, 0],
          [0, 0, 1, 1]
        ],
        name: "e",
        position: { x: 1, y: 1 }
      },
      {
        color: "lightsalmon",
        matrix: [
          [1, 1, 1, 1, 0],
          [0, 0, 1, 0, 0]
        ],
        name: "d",
        position: { x: 0, y: 2 }
      },
      {
        color: "white",
        matrix: [
          [0, 1],
          [1, 1]
        ],
        name: "f",
        position: { x: 2, y: 1 }
      },
      {
        color: "orange",
        matrix: [
          [1, 0, 0],
          [1, 1, 1]
        ],
        name: "a",
        position: { x: 3, y: 0 }
      },
      {
        color: "greenyellow",
        matrix: [
          [1, 1],
          [1, 1]
        ],
        name: "k",
        position: { x: 3, y: 3 }
      }
    ],
    usedLetters: ["i", "e", "d", "f", "a", "k"]
  },
  45: {
    baseData: [
      ["i", "i", "i", "a", "b", "b", "b", false, false, false, false],
      ["i", "e", "i", "a", "b", "b", false, false, false, false, false],
      ["e", "e", "a", "a", "c", false, false, false, false, false, false],
      ["e", "c", "c", "c", "c", false, false, false, false, false, false],
      ["e", "j", "j", "j", "j", false, false, false, false, false, false]
    ],
    bricksPositions: [
      {
        color: "yellow",
        matrix: [
          [1, 1, 1],
          [1, 0, 1]
        ],
        name: "i",
        position: { x: 0, y: 0 }
      },
      {
        color: "green",
        matrix: [
          [0, 1],
          [1, 1],
          [1, 0],
          [1, 0]
        ],
        name: "e",
        position: { x: 1, y: 0 }
      },
      {
        color: "blue",
        matrix: [
          [0, 0, 0, 1],
          [1, 1, 1, 1]
        ],
        name: "c",
        position: { x: 2, y: 1 }
      },
      {
        color: "orange",
        matrix: [
          [0, 1],
          [0, 1],
          [1, 1]
        ],
        name: "a",
        position: { x: 0, y: 2 }
      },
      { color: "darkslateblue", matrix: [[1, 1, 1, 1]], name: "j", position: { x: 4, y: 1 } },
      {
        color: "red",
        matrix: [
          [1, 1, 1],
          [1, 1, 0]
        ],
        name: "b",
        position: { x: 0, y: 4 }
      }
    ],
    usedLetters: ["i", "e", "c", "a", "j", "b"]
  },
  46: null,
  47: null,
  48: null,
  49: null,
  50: null,
  51: null,
  52: null,
  53: null,
  54: null,
  55: null,
  56: null,
  57: null,
  58: null,
  59: null,
  60: null,
  61: null,
  62: null,
  63: null,
  64: null,
  65: null,
  66: null,
  67: null,
  68: null,
  69: null,
  70: null,
  71: null,
  72: null
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
