import React from 'react';
import { Route } from "react-router-dom";
import PropTypes from 'prop-types';

import Welcome from '../Welcome';
import Login from '../Login';
import SignUp from '../SignUp';

const WelcomeRouter = () => {

  return (
    <div>
      <Route path="/" exact component={Welcome} />
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
    </div>
  );
};

export default WelcomeRouter;
