import React, { Component } from 'react';
import { Button, Jumbotron, Form } from 'react-bootstrap';

export default class Signup extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    console.log(data);
  }

  render() {
    return (
      <Jumbotron>
        <div>
          <h1 style={{fontSize: '50px'}}>Sign up...</h1><br />

          <Form onSubmit={this.handleSubmit}>
            <Form.Group>
              <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Who are you, buddy?" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter a username you wish to use!" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" placeholder="What number can we contact you at?" />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="What's your email?" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Shhh, keep this a secret!" />
            </Form.Group>

            <div style={{margin: '0 auto'}}>
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