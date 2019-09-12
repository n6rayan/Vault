import axios from 'axios';
import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';

import './assets/Vault.css';
import AccountHome from './components/AccountHome';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: null
    };

    this.userSessionExists = this.userSessionExists.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  async componentDidMount() {
    await this.userSessionExists();
  }

  updateUser (userObject) {
    this.setState(userObject);
  }

  async userSessionExists() {
    const options = {
      method: 'GET',
      url: 'http://localhost:3001/current-user',
      withCredentials: true
    };

    const response = await axios(options);

    if (response.data.user) {
      this.setState({
        loggedIn: 1,
        username: response.data.user.username
      });
    }
    else {
      this.setState({
        loggedIn: 0,
        username: null
      });
    }
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <AccountHome updateUser={this.updateUser} username={this.state.username}></AccountHome>
        </div>
      );
    }
    else {
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
}