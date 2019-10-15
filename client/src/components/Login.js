import React, { PureComponent } from 'react';

import axios from 'axios';
import { Redirect } from "react-router-dom";

import LoginForm from './LoginForm';

export default class Login extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: ''
    };

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

    this.setState({ [name]: value });
  }

  async handleSubmit(event) {
    event.preventDefault();

    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(this.state),
      url: 'http://localhost:3001/api/login',
      withCredentials: true
    };

    const result = await axios(options);

    if (result.data.success) {
      this.setState({ redirectPath: '/account' });

      window.location.reload();
    }
  }

  render() {
    if (this.state.redirectPath) {
      return <Redirect to={{ pathname: this.state.redirectPath }} />;
    }

    const { username, password } = this.state;

    return <LoginForm handleSubmit={this.handleSubmit} handleChange={this.handleChange} username={username} password={password} />;
  }
}