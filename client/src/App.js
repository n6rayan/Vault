import axios from 'axios';
import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

import './assets/Vault.css';

export default class App extends Component {

  async componentDidMount() {
    await this.userSessionExists();
  }

  async userSessionExists() {
    const options = {
      method: 'GET',
      url: 'http://localhost:3001/current-user'
    };

    const response = await axios(options);
    console.log(response);

    if (response.data.user) {
      this.setState({ loggedIn: true });
    }
    else {
      this.setState({ loggedIn: false });
    }
  }

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