import axios from 'axios';
import React, { PureComponent } from 'react';

import './assets/Vault.css';
import AccountHome from './components/AccountHome';
import Welcome from './components/Welcome';

export default class App extends PureComponent {

  constructor() {
    super();

    this.state = {
    };

    this.userSessionExists = this.userSessionExists.bind(this);
    this.updateUser = this.updateUser.bind(this);
  }

  async componentDidMount() {
    await this.userSessionExists();
  }

  updateUser(userObject) {
    this.setState(userObject);
  }

  async userSessionExists() {
    const options = {
      method: 'GET',
      url: 'http://localhost:3001/api/current-user',
      withCredentials: true
    };

    const response = await axios(options);

    if (!response.data.user) {
      return this.setState({
        loggedIn: 0,
        username: null
      });
    }

    return this.setState({
      loggedIn: 1,
      username: response.data.user.username
    });

  }

  render() {

    if (!this.state.loggedIn) {
      return <Welcome />;
    }

    return <AccountHome updateUser={this.updateUser} username={this.state.username} />;
  }
}