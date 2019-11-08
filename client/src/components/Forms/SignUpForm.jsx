import React from 'react';

import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

const SignUpForm = (props) => {
  return (
    <Form onSubmit={props.handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Who are you, buddy?" onChange={props.handleChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Username</Form.Label>
        <Form.Control name="username" type="text" placeholder="Enter a username you wish to use!" onChange={props.handleChange} />
      </Form.Group>

      <Form.Group>
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control name="phone" type="tel" placeholder="What number can we contact you at?" onChange={props.handleChange} />
      </Form.Group>

      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control name="email" type="email" placeholder="What's your email?" onChange={props.handleChange} />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control name="password" type="password" placeholder="Shhh, keep this a secret!" onChange={props.handleChange} />
      </Form.Group>

      <div>
        <div style={{ float: 'left' }}>
          <Button variant="primary" type="submit">Let&apos;s go!</Button>
        </div>

        <div style={{ float: 'right' }}>
          <Button variant="primary" href="/">Cancel</Button>
        </div>
      </div>
    </Form>
  );
};

SignUpForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
}

export default SignUpForm;
