import axios from 'axios';
import React, { PureComponent } from 'react';

import MainRouter from './components/Navigation/MainRouter';
import WelcomeRouter from './components/Navigation/WelcomeRouter';

export default class App extends PureComponent {

  constructor(props) {
    super(props);

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
      url: 'http://vault.io:3001/api/current-user',
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
      return <WelcomeRouter updateUser={this.updateUser} />;
    }

    return <MainRouter username={this.state.username} updateUser={this.updateUser} />;
  }
}