import React, { Component } from "react";
import { Button, Alert } from "react-bootstrap";
import "App.css";
import { GoPlay } from "react-icons/go";
import { Link } from "react-router-dom";
import Config from "Config";
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    let availableParties = [];

    for (let i in Config.preloadedBase) {
      if (i === "0") {
        availableParties.push(
          <div className="breakFlexWrap" key={i * i}>
            <Alert variant="primary">Starter</Alert>
          </div>
        );
      }
      if (i === "33") {
        availableParties.push(
          <div className="breakFlexWrap" key={i * i}>
            <Alert variant="success">Expert</Alert>
          </div>
        );
      }
      if (i === "49") {
        availableParties.push(
          <div className="breakFlexWrap" key={i * i}>
            <Alert variant="warning">Master</Alert>
          </div>
        );
      }
      if (i === "69") {
        availableParties.push(
          <div className="breakFlexWrap" key={i * i}>
            <Alert variant="danger">Wizard</Alert>
          </div>
        );
      }

      if (Config.preloadedBase[i]) {
        availableParties.push(
          <Link className="margin10 flex-item" to={`/partie/${i}`} key={i}>
            <Button variant="dark" color="#09d3ac" onClick={() => {}}>
              <GoPlay size={32} /> Niveau {i}
            </Button>
          </Link>
        );
      }
    }

    return (
      <div>
        <i>Ne fonctionne pas sur smartphone !</i>
        <br />
        <br />
        <br />
        <br />
        <Link className="flex-item" to={`/partie/newgame`} key={0}>
          <Button variant="dark" color="#09d3ac" onClick={() => {}}>
            <GoPlay size={32} /> Nouvelle partie
          </Button>
        </Link>
        <div>Liste des parties disponibles :</div>

        <ul className="flex-container wrap">{availableParties}</ul>
        <br />
        <br />
        <br />
      </div>
    );
  }
}
