import React, { Component } from "react";
import { StyleSheet, css } from "aphrodite";
import { MdRotateLeft, MdRotateRight, MdFormatListNumbered } from "react-icons/md";
import { GiHorizontalFlip, GiVerticalFlip, GiSaveArrow, GiBrain } from "react-icons/gi";

import { Button } from "react-bootstrap";

import "App.css";
import * as matrixHelper from "matrixHelper";
import Config from "Config";

const _itemSize = 60; // window.innerWidth / 20;

// https://github.com/rajeshpillai/youtube-react-components/blob/master/src/App.js

export default class Partie extends Component {
  constructor(props) {
    super(props);

    const partieId = this.props.match.params.id;

    if (partieId !== "new" && Config.preloadedBase[partieId]) {
      const { baseData, bricksPositions, usedLetters } = Config.preloadedBase[partieId];
      this.state = {
        partieId,
        baseData,
        bricksPositions,
        usedLetters,
        bricks: Config.bricks, // toutes les bricks, permet de les manipuler pour les tourner ou les poser sur le plateau
        showIndex: false
      };
    } else {
      this.state = {
        partieId,
        /* represente le plateau avec les bricks dessus, c'est une matrix ou les case occupées sont codées par la lettre de la bricks dessus,
        plus facile pour les calculs
        pour effacer/deplacer une brick il faut mettre à false position dans baseData et bricksPositions, et remettre la lettre dans usedLetters
        */
        baseData: this.initBase(),
        bricksPositions: [], // tableau avec les bricks qui sont sur la base et leurs positions, permet de gérer les drags de la forme en entier

        usedLetters: [], // contient le nom des bricks posées sur le plateau
        bricks: Config.bricks, // toutes les bricks, permet de les manipuler pour les tourner ou les poser sur le plateau
        showIndex: false
      };
    }
  }

  toggleShowIndex = () => {
    this.setState({
      showIndex: !this.state.showIndex
    });
  };

  initBase() {
    const res = [...Array(Config.baseSize.y)].map(x => Array(Config.baseSize.x).fill(false));
    return res;
  }

  // componentDidMount = async () => {};

  resolve = async () => {
    console.log("resolve !");

    let unusedBricks = [];
    for (let name in this.state.bricks) {
      // Pour chaque brick qui n'est pas sur le plateau
      if (!this.state.usedLetters.includes(name)) {
        unusedBricks.push(this.state.bricks[name]);
      }
    }
    const solved = await matrixHelper.resolve(this.state.baseData, unusedBricks, this.state.usedLetters, this.state.bricksPositions);
    console.log(solved);
    let { usedLetters, bricksPositions, baseData } = solved;

    this.setState({
      usedLetters,
      bricksPositions,
      baseMatrix: baseData
    });
  };
  /** 
   * essai de mettre une brick dans une position
   @param name of the brick:a b c ....
   @param x indice de la ligne
   @param y indice de la colonne
   @param deleteMe delete avant de faire un set
   on represente le base comme une matrix également
  */
  trySetBrickAt = (baseData, brickMatrix, name, x, y, deleteMe) => {
    const can = matrixHelper.canSetBrick(baseData, brickMatrix, name, x, y);

    if (can) {
      if (deleteMe) {
        this.removeBrickFromBaseData(name);
      }
      this.setBrickAt(brickMatrix, name, x, y);
    } else {
      // console.log("cannot be set here ! ");
    }
  };

  /**
   * remove a brick from baseData
   * @param {*} name
   */
  removeBrickFromBaseData(name) {
    console.log("removeBrickFromBaseData", name);
    let baseData = [...this.state.baseData];

    baseData.forEach(function(a, i) {
      a.forEach(function(b, j) {
        if (baseData[i][j] === name) {
          baseData[i][j] = false;
        }
      });
    });

    let bricksPositions = this.state.bricksPositions.filter(elem => {
      return elem.name !== name;
    });
    let usedLetters = this.state.usedLetters.filter(elem => {
      return elem !== name;
    });
    this.setState({ baseData, bricksPositions, usedLetters });
  }

  // met la brick dans cette position
  setBrickAt = (brickMatrix, name, x, y) => {
    const brick = this.state.bricks[name];
    const brickSize = {
      x: matrixHelper.getXLength(brickMatrix),
      y: matrixHelper.getYLength(brickMatrix)
    };
    let baseData = [...this.state.baseData];
    for (let i = 0; i < brickSize.x; i++) {
      for (let j = 0; j < brickSize.y; j++) {
        try {
          if (brickMatrix[i][j] === 1) {
            baseData[i + x][j + y] = name;
          }
        } catch (error) {
          console.log({ i, j, x, y, baseData });
          console.error(error);
        }
      }
    }

    this.setState((prevState, props) => ({
      usedLetters: [...prevState.usedLetters, name],
      bricksPositions: [...prevState.bricksPositions, { ...brick, matrix: brickMatrix, name, position: { l: x, c: y } }],
      baseData
    }));
  };

  /**
   * @param ev
   * @param name
   * @param tx translation
   * @param ty translation
   */
  onDragStart = (ev, name, tx, ty) => {
    ev.dataTransfer.setData("name", name);
    ev.dataTransfer.setData("tx", tx);
    ev.dataTransfer.setData("ty", ty);
  };

  onDragOver = ev => {
    ev.preventDefault();
  };

  onDrop = (ev, position, source) => {
    function isDefined(val) {
      return val !== undefined && val !== "undefined";
    }
    let name = ev.dataTransfer.getData("name");
    let tx = isDefined(ev.dataTransfer.getData("tx")) ? ev.dataTransfer.getData("tx") : 0;
    let ty = isDefined(ev.dataTransfer.getData("ty")) ? ev.dataTransfer.getData("ty") : 0;

    if (name) {
      if (position !== undefined || source !== undefined) {
        switch (source) {
          case "removeZone":
            this.removeBrickFromBaseData(name);
            break;
          //        case "brickOnBase":
          default:
            const brick = this.state.bricks[name];
            this.trySetBrickAt(this.state.baseData, brick.matrix, name, position.l - tx, position.c - ty, true);
        }
      }
    }
  };

  renderBase() {
    const { baseData, bricksPositions } = this.state;

    return (
      <div className={css(styles.posRelative)}>
        {bricksPositions.map((row, x) => {
          return (
            <div key={x} style={{ position: "absolute", left: _itemSize * row.position.c, top: _itemSize * row.position.l }}>
              <ShowBrick
                name={row.name}
                data={row}
                showControl={false}
                updateBrick={(name, newbrick) => {
                  let { bricks } = this.state;
                  bricks[name].matrix = newbrick;
                  this.setState({
                    bricks
                  });
                }}
                onDragStart={(ev, id) => {
                  this.onDragStart(ev, id);
                }}
                onDragOver={this.onDragOver}
                onDrop={e => this.onDrop(e, row.position, "brickOnBase")}
              />
            </div>
          );
        })}
        {/* on affiche les bricks en dessous des cases pour pouvoir faire le drop sur n'importe qu'elle case */}
        {baseData.map((row, x) => (
          <div key={x}>
            {row.map((col, y) => {
              let position = { x, y, l: x, c: y };
              return (
                <div key={x + "-" + y} style={{ position: "absolute", left: _itemSize * y, top: _itemSize * x }}>
                  <div
                    className={baseData[x][y] === false ? css(styles.emptyItem) : css(styles.item)}
                    key={y}
                    onDragOver={this.onDragOver}
                    onDrop={e => this.onDrop(e, position, "base")}
                  >
                    {this.state.showIndex && <span>{x + "," + y}</span>}
                  </div>
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
    for (let i in this.state.bricks) {
      if (!this.state.usedLetters.includes(i)) {
        console.log("unused", this.state.bricks[i]);
        show.push(
          <div key={i}>
            <ShowBrick
              name={i}
              data={this.state.bricks[i]}
              showControl
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
        <h2>
          Partie :{" "}
          <Button variant="dark" color="#09d3ac" onClick={this.toggleShowIndex}>
            <MdFormatListNumbered size={32} />
          </Button>{" "}
          <Button
            variant="dark"
            color="#09d3ac"
            onClick={() => {
              const { baseData, usedLetters, bricksPositions } = this.state;
              alert(
                JSON.stringify({
                  baseData,
                  usedLetters,
                  bricksPositions
                })
              );
            }}
          >
            <GiSaveArrow size={32} />
          </Button>
          <Button variant="danger" color="#09d3ac" onClick={this.resolve}>
            <GiBrain size={32} />
          </Button>{" "}
        </h2>
        <br />

        <div className={css(styles.flexrow)}>
          <div className={css(styles.removeZone)} onDragOver={e => this.onDragOver(e)} onDrop={e => this.onDrop(e, null, "removeZone")}>
            remove Zone
          </div>
          {this.renderBase()}
        </div>

        {this.renderUnusedBricks()}
      </div>
    );
  }
}

class ShowBrick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      translationX: 0,
      translationY: 0
    };
  }
  setTranslation(x, y) {
    this.setState({
      translationX: x,
      translationY: y
    });
  }

  handleKeyboard = event => {
    const arrowKeys = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"];

    if (arrowKeys.includes(event.key)) {
      event.preventDefault();
      switch (event.key) {
        case "ArrowLeft":
          this.rotateLeft();
          break;
        case "ArrowRight":
          this.rotateRight();
          break;
        case "ArrowUp":
          this.flipY();
          break;
        case "ArrowDown":
          this.flipX();
          break;
      }
    }
  };

  rotateRight = () => {
    const { matrix } = this.props.data;
    const nbrick = matrixHelper.rotateRight(matrix);
    this.props.updateBrick(this.props.name, nbrick);
  };

  rotateLeft = () => {
    const { matrix } = this.props.data;
    const nbrick = matrixHelper.rotateLeft(matrix);
    this.props.updateBrick(this.props.name, nbrick);
  };
  flipY = () => {
    const { matrix } = this.props.data;
    const nbrick = matrixHelper.flipY(matrix);
    this.props.updateBrick(this.props.name, nbrick);
  };
  flipX = () => {
    const { matrix } = this.props.data;
    const nbrick = matrixHelper.flipX(matrix);
    this.props.updateBrick(this.props.name, nbrick);
  };

  matrixRender() {
    const { matrix, color } = this.props.data;
    return (
      <div
        style={{ position: "relative", margin: 0, padding: 0 }}
        draggable
        onDragStart={e => {
          console.log("drag strat from showbrick");
          this.props.onDragStart(e, this.props.name, this.state.translationX, this.state.translationY);
        }}
      >
        {matrix.map((row, i) => {
          return (
            <div key={i}>
              {row.map((column, j) => {
                return (
                  <div
                    className={css(styles.item)}
                    style={{ position: "absolute", left: _itemSize * j, top: _itemSize * i, backgroundColor: column ? color : false }}
                    key={j}
                    onMouseDown={e => {
                      this.setTranslation(i, j);
                    }}
                  >
                    {i === 0 && j === 0 && (
                      <div
                        style={{
                          ...styles.dragMarker._definition,
                          color
                        }}
                      >
                        *
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
  render() {
    const { matrix } = this.props.data;
    let ws = Math.max(matrixHelper.getYLength(matrix), matrixHelper.getXLength(matrix));
    return (
      <div key={this.props.name}>
        {this.props.showControl ? (
          <div
            tabIndex="0"
            onKeyDown={this.handleKeyboard}
            style={{
              width: ws * _itemSize,
              height: 75 + ws * _itemSize,
              margin: 5
            }}
          >
            <div className={css(styles.flexcolumn)}>
              <div>{this.props.name}</div>
              <div className={css(styles.flexrow)}>
                <Button variant="false" onClick={this.rotateRight}>
                  <div style={{ color: "white" }}>
                    <MdRotateLeft size={32} />
                  </div>
                </Button>

                <Button variant="false" onClick={this.rotateLeft}>
                  <div style={{ color: "white" }}>
                    <MdRotateRight size={32} />
                  </div>
                </Button>
              </div>
              <div className={css(styles.flexrow)}>
                <Button variant="false" onClick={this.flipY}>
                  <div style={{ color: "white" }}>
                    <GiHorizontalFlip size={32} />
                  </div>
                </Button>
                <Button variant="false" onClick={this.flipX}>
                  <div style={{ color: "white" }}>
                    <GiVerticalFlip size={32} />
                  </div>
                </Button>
              </div>
            </div>
            {this.matrixRender()}
          </div>
        ) : (
          this.matrixRender()
        )}
      </div>
    );
  }
}

const _removeZoneWidth = 200;
const styles = StyleSheet.create({
  posRelative: {
    position: "relative",
    display: "inline-block",
    margin: 0,
    padding: 0,
    borderColor: "#1c1c1c",
    backgroundColor: "#1c1c1c",
    borderRadius: 20,
    borderWidth: 5,
    borderStyle: "solid",
    width: 8 + _itemSize * Config.baseSize.x,
    height: 8 + _itemSize * Config.baseSize.y
  },
  baseSize: {
    height: 10 + _itemSize * Config.baseSize.y,
    width: _removeZoneWidth + 50 + _itemSize * Config.baseSize.x
  },
  flexrow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    padding: 0
  },
  flexcolumn: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: 0,
    padding: 0
  },
  shapeOutside: {
    shapeOutside: "none",
    float: "left"
  },

  removeZone: {
    borderColor: "grey",
    borderStyle: "dotted",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
    width: _removeZoneWidth,
    height: 300,
    marginRight: 50
  },
  emptyItem: {
    width: _itemSize,
    height: _itemSize,
    backgroundColor: "#302f2f",
    borderRadius: 50,
    borderWidth: 0,
    margin: 0,
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  item: {
    display: "flex",
    width: _itemSize,
    height: _itemSize,
    borderRadius: 50,
    margin: 0,
    padding: 0,
    alignItems: "center",
    justifyContent: "center"
  },

  smalltitle: {
    fontSize: 13,
    color: "white"
  },
  dragMarker: {
    borderRadius: 50,
    width: 20,
    height: 20,
    borderWidth: 1,
    borderStyle: "solid",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#282c34",
    zIndex: 10000
  }
});
