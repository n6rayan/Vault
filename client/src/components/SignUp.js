import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import axios from 'axios';

import SignUpForm from './Forms/SignUpForm';

export default class SignUp extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
    };
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
      url: 'http://vault.io:3001/api/user'
    };

    let result = await axios(options);

    if (result.data.success) {
      alert('User created!');

      this.setState({ redirectPath: '/login' });
    }
    else {
      alert(`Problem creating user: ${result.data.error}`);

      this.setState({ redirectPath: '/signup' });
    }
  }

  render() {
    if (this.state.redirectPath) {
      return (<Redirect to={{ pathname: this.state.redirectPath }} />);
    }
    return (
      <div>
        <h1 style={{ fontSize: '50px' }}>Sign up...</h1><br />

        <SignUpForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}