import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

import './assets/Home.css';

export default class App extends Component {

  render() {
    return (
      <Jumbotron>
        <div align="right">
          <p>Already registered? <a href="/login">Login</a></p>
        </div>

        <div className="CenterPage" align="center">
          <h1>Vault</h1><br />

          <p>Welcome to Vault, your centralised banking application!</p><br />

          <Button variant="primary" href="/signup">Get Started</Button>
        </div>
      </Jumbotron>
    );
  }
}