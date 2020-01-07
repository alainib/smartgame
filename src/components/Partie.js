import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";

import "App.css";
function clj(data) {
  console.log(JSON.stringify(data, undefined, 2));
}
function clnj(astring, data) {
  console.log(astring);
  console.log(JSON.stringify(data, undefined, 2));
  console.log("---------------");
}

const _supportSize = {
  x: 11,
  y: 5
};
const _bricks = {
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
    color: "grey",
    matrix: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0]
    ]
  }
};

export default class Partie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supportData: this.initSupport(),
      colors: this.initColors(),
      bricks: _bricks
    };
  }
  initColors() {
    let colors = { x: "none" };
    for (var i in _bricks) {
      colors[i] = _bricks[i].color;
    }
    return colors;
  }
  initSupport() {
    // const res = [...Array(_supportSize.y)].map(x => Array(_supportSize.x).fill(false));
    let res = [
      ["a", "a", "a", "a", false, false, "i", false, false, false, false],
      ["b", "b", "b", false, false, false, "i", false, false, false, false],
      ["b", false, false, false, false, false, "i", false, false, false, false],
      [false, false, false, false, false, false, "i", false, false, false, false],
      [false, "j", "j", "j", "j", "j", false, false, false, false, false]
    ];
    return res;
  }

  async componentDidMount() {
    this.trySetBrickAt("l", 0, 3);
    this.trySetBrickAt("i", 2, 1);
  }

  /** 
   * essai de mettre une brick dans une position
   @param name of the brick:a b c ....
   @param x abscisse index to set the brick at
   @param y ordonate index to set the brick at
   on represente le support comme un support comme matrix également
  
   0 _ _ _ _ _ _ _ > x 
   | 
   | 
   |
   |
   y 
  
  
  */
  trySetBrickAt(name, x, y) {
    let { supportData } = this.state;

    const can = this.canSetBrick(name, x, y);

    if (can) {
      this.setBrickAt(name, x, y);
      this.setState({ supportData });
    } else {
      console.log("cannot be set here ! ");
    }
  }

  // met la brick dans cette position
  setBrickAt(name, x, y) {
    const brick = this.state.bricks[name];
    console.log(brick);
    const bsize = {
      x: this.getXLength(brick.matrix),
      y: this.getYLength(brick.matrix)
    };
    let supportData = [...this.state.supportData];
    for (var i = 0; i < bsize.x; i++) {
      for (var j = 0; j < bsize.y; j++) {
        if (brick.matrix[i][j] === 1) {
          supportData[i + x][j + y] = name;
        }
      }
    }
    console.log(supportData);
    this.setState({ supportData });
  }

  // check si on peut mettre la brick à la position (x,y). il faut que la place soit bien vide
  canSetBrick(name, x, y) {
    let { supportData } = this.state;
    const brick = this.state.bricks[name];
    let can = true;
    // on test que la brick ne depasse pas du support

    const bsize = {
      x: this.getXLength(brick.matrix),
      y: this.getYLength(brick.matrix)
    };
    const supportSize = {
      x: this.getXLength(supportData),
      y: this.getYLength(supportData)
    };

    // console.log({ x, "bsize.x": bsize.x, "supportSize.x": supportSize.x, res: x + bsize.x > supportSize.x });
    if (x + bsize.x > supportSize.x) {
      return false;
    }

    // console.log({ y, "bsize.y": bsize.y, "supportSize.y": supportSize.y, res: y + bsize.y > supportSize.y });
    if (y + bsize.y > supportSize.y) {
      return false;
    }

    // on crop une sous matrix de taille identique à brick dans supportData, plus facile pour comparer
    const sub = this.getSub(supportData, x, y, bsize.x, bsize.y);
    console.log(sub, brick.matrix);
    for (var i = 0; i < bsize.x; i++) {
      for (var j = 0; j < bsize.y; j++) {
        if (brick.matrix[i][j] === 1) {
          if (sub[i][j] !== false) {
            can = false;
          }
        }
      }
    }

    return can;
  }
  /**
   * découpe une sous matrice dans brick
   * @param {*} brick
   * @param {*} start_y position y à partir de laquel couper
   * @param {*} start_x position x à partir de laquel couper
   * @param {*} y_size
   * @param {*} x_size :
   */
  getSub(brick, start_x, start_y, x_size, y_size) {
    // https://stackoverflow.com/questions/52313225/how-to-extract-submatrix-matrix-a-matrix
    return brick.filter((_, i) => i >= start_x && i < start_x + x_size).map(a => a.slice(start_y, start_y + y_size));
  }
  getYLength(brick) {
    let max = 0;
    for (var i in brick) {
      max = brick[i].length > max ? brick[i].length : max;
    }
    return max;
  }
  getXLength(brick) {
    return brick.length;
  }

  renderSupport() {
    const { supportData, colors } = this.state;

    return (
      <div>
        {supportData.map((row, i) => (
          <div className={css(styles.bloc)} key={i}>
            {row.map((col, j) => {
              return (
                <div className={css(styles.case)} style={{ backgroundColor: colors[col] }} key={j}>
                  <span className={css(styles.smalltitle)}>{col + i + "," + j}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  render() {
    return (
      <div>
        <h2 className="padding15">Partie :</h2>
        <br />
        {this.renderSupport()}
      </div>
    );
  }
}

const styles = StyleSheet.create({
  bloc: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  item: {
    width: 175,
    height: 75,
    margin: 5
  },
  smalltitle: {
    fontSize: 15,
    color: "white"
  },
  case: {
    width: "100px",
    height: "100px"
  }
});

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
