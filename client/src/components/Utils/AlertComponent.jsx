import React from 'react';

import PropTypes from 'prop-types';
import { Alert } from 'react-bootstrap';

const AlertComponent = (props) => {
  return (
    <Alert variant={props.variant} onClose={props.closeCb} dismissible>
      <Alert.Heading>Incorrect Username/Password</Alert.Heading>
      <p>Please try again!</p>
    </Alert>
  );
};

AlertComponent.propTypes = {
  variant: PropTypes.string.isRequired,
  closeCb: PropTypes.func.isRequired,
}

export default AlertComponent;
