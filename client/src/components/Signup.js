import React, { Component } from 'react';

import axios from 'axios';
import { Button, Jumbotron, Form } from 'react-bootstrap';

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
      url: 'http://localhost:3001/user'
    };

    let result = await axios(options);

    if (result.data.success) {
      alert('User created!');
    }
    else {
      alert(`Problem creating user: ${result.data.error}`);
    }

    this.form.reset();
  }

  render() {
    return (
      <Jumbotron>
        <div>
          <h1 style={{fontSize: '50px'}}>Sign up...</h1><br />

          <Form onSubmit={this.handleSubmit} ref={form => this.form = form}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
                <Form.Control name="name" type="text" placeholder="Who are you, buddy?" onChange={this.handleChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control name="username" type="text" placeholder="Enter a username you wish to use!" onChange={this.handleChange} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control name="phone" type="tel" placeholder="What number can we contact you at?" onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control name="email" type="email" placeholder="What's your email?" onChange={this.handleChange} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" type="password" placeholder="Shhh, keep this a secret!" onChange={this.handleChange} />
            </Form.Group>

            <div>
              <div style={{float: 'left'}}>
                <Button variant="primary" type="submit">
                  Let's go!
                </Button>
              </div>

              <div style={{float: 'right'}}>
                <Button variant="primary" href="/">
                  Cancel
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Jumbotron>
    );
  }
}