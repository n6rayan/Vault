import axios from 'axios';
import React, { Component } from 'react';
import { Button, Jumbotron } from 'react-bootstrap';
import { Redirect } from "react-router-dom";

import './assets/Vault.css';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedIn: null
    };

    this.userSessionExists = this.userSessionExists.bind(this);
    this.logout = this.logout.bind(this);
  }

  async componentDidMount() {
    await this.userSessionExists();
  }

  async userSessionExists() {
    const options = {
      method: 'GET',
      url: 'http://localhost:3001/current-user',
      withCredentials: true
    };

    const response = await axios(options);
    console.log(response);

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

  async logout(event) {
    event.preventDefault();

    const options = {
      method: 'GET',
      url: 'http://localhost:3001/logout',
      withCredentials: true
    };

    await axios(options);

    return <Redirect to={{pathname: '/'}} />
  }

  render() {
    if (this.state.loggedIn) {
      return (
        <div>
          <p>Hi {this.state.username}</p>

          <Button variant="primary" onClick={this.logout}>Logout</Button>
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