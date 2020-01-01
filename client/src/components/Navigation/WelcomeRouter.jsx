import React from 'react';

import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import { Route, Router } from "react-router-dom";

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
      <Router history={createBrowserHistory()}>
        <Route path="/" exact component={Welcome} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/signup" component={SignUp} />
      </Router>
    </div>
  );
};

WelcomeRouter.propTypes = {
  updateUser: PropTypes.func.isRequired
};

export default WelcomeRouter;
