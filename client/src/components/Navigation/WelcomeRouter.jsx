import React from 'react';
import { Route } from "react-router-dom";
import PropTypes from 'prop-types';

import Welcome from '../Welcome';
import Login from '../Login';
import SignUp from '../SignUp';

const WelcomeRouter = (props) => {

  const LoginComponent = (props) => {
    return (
      <Login {...props} />
    );
  }

  return (
    <div>
      <Route path="/" exact component={Welcome} />
      <Route path="/login" component={LoginComponent} />
      <Route path="/signup" component={SignUp} />
    </div>
  );
};

WelcomeRouter.propTypes = {
  updateUser: PropTypes.func.isRequired
};

export default WelcomeRouter;
