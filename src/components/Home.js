import React, { Component } from "react";
import { Button } from "react-bootstrap";
import "App.css";
import { GoPlay } from "react-icons/go";
import { Link } from "react-router-dom";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Link className="flex-item" to={`/partie/newgame`} key={0}>
          <Button variant="dark" color="#09d3ac" onClick={() => {}}>
            <GoPlay size={32} /> Nouvelle partie
          </Button>
        </Link>

        <div>Liste des parties disponibles :</div>
      </div>
    );
  }
}
