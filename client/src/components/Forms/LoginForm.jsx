import React from 'react';

import PropTypes from 'prop-types';
import { Button, Form } from 'react-bootstrap';

import AlertComponent from '../Utils/AlertComponent';

const LoginForm = (props) => {

  const alert = props.showAlert ? <AlertComponent variant="danger" closeCb={() => props.alertStateHandler(false) } /> : "";

  return (
    <div>
      {alert}

      <Form onSubmit={props.handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control value={props.username} name="username" type="text" placeholder="Enter username..." onChange={props.handleChange} />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control value={props.password} name="password" type="password" placeholder="Enter password..." onChange={props.handleChange} />
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
    </div>
  );
};

LoginForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  showAlert: PropTypes.bool,
}

export default LoginForm;
