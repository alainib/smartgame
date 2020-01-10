import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import { MdRotateLeft, MdRotateRight } from "react-icons/md";
import { GiHorizontalFlip, GiVerticalFlip } from "react-icons/gi";
import { Button } from "react-bootstrap";
import "App.css";
import * as matrixHelper from "matrixHelper";
import Config from "Config";

// https://github.com/rajeshpillai/youtube-react-components/blob/master/src/App.js

export default class Partie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseData: this.initBase(), // represente le plateau avec les bricks dessus
      colors: this.initColors(), // pour afficher les couleurs des bricks
      usedLetters: [], // contient le nom des bricks posées sur le plateau
      bricks: Config.bricks // toutes les bricks, permet de les manipuler pour les tourner ou les poser sur le plateau
    };
  }
  initColors() {
    let colors = { x: "none" };
    for (var i in Config.bricks) {
      colors[i] = Config.bricks[i].color;
    }
    return colors;
  }

  initBase() {
    const res = [...Array(Config.baseSize.y)].map(x => Array(Config.baseSize.x).fill(false));
    /* const res = [
      ["a", "a", "a", "a", false, false, "i", false, false, false, false],
      ["b", "b", "b", false, false, false, "i", false, false, false, false],
      ["b", false, false, false, false, false, "i", false, false, false, false],
      [false, false, false, false, false, false, "i", false, false, false, false],
      [false, "j", "j", "j", "j", "j", false, false, false, false, false]
    ];*/
    return res;
  }

  componentDidMount = async () => {
    this.trySetBrickAt("l", 0, 3);
    this.trySetBrickAt("i", 2, 1);
    this.trySetBrickAt("a", 2, 9);
  };

  /** 
   * essai de mettre une brick dans une position
   @param name of the brick:a b c ....
   @param x abscisse index to set the brick at
   @param y ordonate index to set the brick at
   on represente le base comme une matrix également
  
   0 _ _ _ _ _ _ _ > x 
   | 
   | 
   |
   |
   y 
  
  
  */
  trySetBrickAt = (name, x, y) => {
    const can = this.canSetBrick(name, x, y);

    if (can) {
      this.setBrickAt(name, x, y);
    } else {
      console.log("cannot be set here ! ");
    }
  };

  // met la brick dans cette position
  setBrickAt = (name, x, y) => {
    const brick = this.state.bricks[name];

    const brickSize = {
      x: matrixHelper.getXLength(brick.matrix),
      y: matrixHelper.getYLength(brick.matrix)
    };
    let baseData = [...this.state.baseData];
    for (var i = 0; i < brickSize.x; i++) {
      for (var j = 0; j < brickSize.y; j++) {
        if (brick.matrix[i][j] === 1) {
          baseData[i + x][j + y] = name;
        }
      }
    }

    this.setState((prevState, props) => ({
      usedLetters: [...prevState.usedLetters, name],
      baseData
    }));
  };

  // check si on peut mettre la brick à la position (x,y). il faut que la place soit bien vide
  canSetBrick = (name, x, y) => {
    let { baseData } = this.state;
    const brick = this.state.bricks[name];
    let can = true;
    // on test que la brick ne depasse pas du base

    const brickSize = {
      x: matrixHelper.getXLength(brick.matrix),
      y: matrixHelper.getYLength(brick.matrix)
    };
    const baseSize = {
      x: matrixHelper.getXLength(baseData),
      y: matrixHelper.getYLength(baseData)
    };

    if (x + brickSize.x > baseSize.x) {
      console.log({ x, "brickSize.x": brickSize.x, "baseSize.x": baseSize.x, res: x + brickSize.x > baseSize.x });
      return false;
    }

    if (y + brickSize.y > baseSize.y) {
      console.log({ y, "brickSize.y": brickSize.y, "baseSize.y": baseSize.y, res: y + brickSize.y > baseSize.y });
      return false;
    }

    // on crop une sous matrix de taille identique à brick dans baseData, plus facile pour comparer
    const sub = matrixHelper.getSub(baseData, x, y, brickSize.x, brickSize.y);
    // console.log(sub, brick.matrix);
    for (var i = 0; i < brickSize.x; i++) {
      for (var j = 0; j < brickSize.y; j++) {
        if (brick.matrix[i][j] === 1) {
          if (sub[i][j] !== false) {
            can = false;
          }
        }
      }
    }

    return can;
  };

  onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    ev.dataTransfer.setData("id", id);
  };

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDrop = (ev, position) => {
    let id = ev.dataTransfer.getData("id");
    console.log("onDrop", id, position);
    this.trySetBrickAt(id, position.i, position.j);
  };

  renderBase() {
    const { baseData, colors } = this.state;

    return (
      <div>
        {baseData.map((row, i) => (
          <div className={css(styles.flexrow)} key={i}>
            {row.map((col, j) => {
              let position = { i, j };
              return (
                <div
                  className={css(styles.item)}
                  style={{ backgroundColor: colors[col] }}
                  key={j}
                  onDragOver={e => this.onDragOver(e)}
                  onDrop={e => this.onDrop(e, position)}
                >
                  <span className={css(styles.smalltitle)}>{col + i + "," + j}</span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }
  renderUnusedBricks() {
    let show = [];
    for (var i in this.state.bricks) {
      if (!this.state.usedLetters.includes(i)) {
        show.push(
          <div key={i}>
            <ShowBrick
              name={i}
              data={this.state.bricks[i]}
              updateBrick={(name, newbrick) => {
                let { bricks } = this.state;
                bricks[name].matrix = newbrick;
                this.setState({
                  bricks
                });
              }}
              onDragStart={this.onDragStart}
              onDragOver={this.onDragOver}
              onDrop={this.onDrop}
            />
          </div>
        );
      }
    }
    return <div className="flex-container wrap">{show}</div>;
  }

  render() {
    return (
      <div>
        <h2>Partie :</h2>
        <br />

        {this.renderBase()}

        {this.renderUnusedBricks()}
      </div>
    );
  }
}

class ShowBrick extends Component {
  render() {
    const { matrix, color } = this.props.data;

    return (
      <div key={this.props.name} className="margin10">
        <div className={css(styles.flexcolumn)}>
          <div>{this.props.name}</div>
          <div className={css(styles.flexrow)}>
            <Button
              variant="false"
              onClick={() => {
                const nbrick = matrixHelper.rotateRight(matrix);
                this.props.updateBrick(this.props.name, nbrick);
              }}
            >
              <div style={{ color: "white" }}>
                <MdRotateLeft size={32} />
              </div>
            </Button>

            <Button
              variant="false"
              onClick={() => {
                const nbrick = matrixHelper.rotateLeft(matrix);
                this.props.updateBrick(this.props.name, nbrick);
              }}
            >
              <div style={{ color: "white" }}>
                <MdRotateRight size={32} />
              </div>
            </Button>
          </div>
          <div className={css(styles.flexrow)}>
            <Button
              variant="false"
              onClick={() => {
                const nbrick = matrixHelper.flipY(matrix);
                this.props.updateBrick(this.props.name, nbrick);
              }}
            >
              <div style={{ color: "white" }}>
                <GiHorizontalFlip size={32} />
              </div>
            </Button>
            <Button
              variant="false"
              onClick={() => {
                const nbrick = matrixHelper.flipX(matrix);
                this.props.updateBrick(this.props.name, nbrick);
              }}
            >
              <div style={{ color: "white" }}>
                <GiVerticalFlip size={32} />
              </div>
            </Button>
          </div>
        </div>

        <div
          draggable
          onDragStart={e => this.props.onDragStart(e, this.props.name)}
          /*onDragOver={e => this.props.onDragOver(e)}
                    onDrop={e => {
                      this.props.onDrop(e, "wip");
                    }} */
        >
          {matrix.map((row, i) => {
            return (
              <div className={css(styles.flexrow)} key={i}>
                {row.map((col, j) => {
                  return (
                    <div className={css(styles.item)} style={{ backgroundColor: col ? color : false }} key={j}>
                      {i === 0 && j === 0 ? "*" : null}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

// let itemSize = window.innerWidth / 20;
const styles = StyleSheet.create({
  flexrow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  flexcolumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },

  item: {
    width: 60,
    height: 60,
    borderRadius: 50
  },
  itemSmall: {
    width: 40,
    height: 40,
    borderRadius: 50
  },
  smalltitle: {
    fontSize: 13,
    color: "white"
  }
});
