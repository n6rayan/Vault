import React from 'react';

import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import { Route, Router } from "react-router-dom";

import Accounts from '../MainApp/Accounts';
import Main from '../MainApp/Main';
import Navigation from './Navigation';
import RegisterBank from '../MainApp/RegisterBank';
import Transactions from '../MainApp/Transactions';

const MainRouter = (props) => {
  return (
    <div>
      <Navigation username={props.username} updateUser={props.updateUser} />

      <Router history={createBrowserHistory()}>
        <Route path="/account" exact component={Main} />
        <Route path="/account/register-bank" component={RegisterBank} />
        <Route path="/account/transactions" component={Transactions} />
        <Route path="/account/accounts-list" component={Accounts} />
      </Router>
    </div>
  );
};

MainRouter.propTypes = {
  username: PropTypes.string.isRequired,
  updateUser: PropTypes.func.isRequired,
};

export default MainRouter;
