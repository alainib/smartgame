import React, { Component } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { GoScreenFull, GoScreenNormal } from "react-icons/go";
import { Navbar, Nav, Button } from "react-bootstrap";
import Fullscreen from "react-full-screen";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Home from "components/Home";
import Partie from "components/Partie";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullScreen: false,
      // bug a cause de router
      isFullScreenTest: 0
    };
  }

  setIsFullScreen = val => {
    if (val === false) {
      this.setState({ isFullScreen: false, isFullScreenTest: 0 });
    } else {
      if (this.state.isFullScreenTest === 0 || this.state.isFullScreenTest % 3 !== 0) {
        this.setState({ isFullScreen: true, isFullScreenTest: this.state.isFullScreenTest + 1 });
      } else {
        this.setState({ isFullScreen: false, isFullScreenTest: 0 });
      }
    }
  };

  renderRouter() {
    return (
      <Router>
        <div className="App">
          <Navbar bg="dark" variant="dark" className="bg-light justify-content-between">
            <Nav className="mr-auto">
              <Navbar.Brand>
                <Link className="App-link" to="/">
                  Smart IQ
                </Link>
              </Navbar.Brand>
              <Nav.Item>
                <Link className="App-link" to="/">
                  Accueil
                </Link>
              </Nav.Item>
            </Nav>

            <Nav.Item>
              <i className="smallTextRed">©LONPOS</i>
            </Nav.Item>
            <Nav.Item>
              <Button
                variant="dark"
                color="#09d3ac"
                onClick={() => {
                  this.setIsFullScreen(true);
                }}
              >
                {this.state.isFullScreen ? <GoScreenNormal size={32} /> : <GoScreenFull size={32} />}
              </Button>
            </Nav.Item>
          </Navbar>

          <div className="App-body">
            <Switch>
              <Route path="/partie/:id" render={props => <Partie {...props} />} />

              <Route path="/" render={props => <Home />} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
  render() {
    if (this.state.isFullScreen) {
      return (
        <Fullscreen enabled={true} onChange={val => this.setIsFullScreen(val)}>
          {this.renderRouter()}
        </Fullscreen>
      );
    } else {
      return this.renderRouter();
    }
  }
}
