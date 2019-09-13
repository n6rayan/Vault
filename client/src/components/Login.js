import React, { Component } from 'react';
import { Redirect } from "react-router-dom";

import axios from 'axios';
import { Button, Form } from 'react-bootstrap';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      username: '',
      password: ''
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
      url: 'http://localhost:3001/login',
      withCredentials: true
    };

    const result = await axios(options);

    this.form.reset();

    if (result.data.success) {
      this.setState({ redirectPath: '/' });
    }
    else {
      this.setState({ redirectPath: '/login' });
    }
  }

  render() {
    if (this.state.redirectPath) {
      return (<Redirect to={{ pathname: this.state.redirectPath }} />);
    }
    else {
      return (
        <div>
          <h1 style={{ fontSize: '50px' }}>Login...</h1><br />

          <Form onSubmit={this.handleSubmit} ref={form => this.form = form}>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control value={this.state.username} name="username" type="text" placeholder="Enter username..." onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control value={this.state.password} name="password" type="password" placeholder="Enter password..." onChange={this.handleChange} />
            </Form.Group>

            <div>
              <div style={{ float: 'left' }}>
                <Button variant="primary" type="submit">
                  Let's go!
                  </Button>
              </div>

              <div style={{ float: 'right' }}>
                <Button variant="primary" href="/">
                  Cancel
                  </Button>
              </div>
            </div>
          </Form>
        </div>
      );
    }
  }
}