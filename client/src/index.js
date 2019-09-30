import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Jumbotron } from 'react-bootstrap';

import App from './App';
import Login from './components/Login';
import SignUp from './components/SignUp';
import ReigsterBank from './components/RegisterBank';

import whyDidYouRender from '@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js';
whyDidYouRender(React);

const routing = (
  <Router>
    <Route exact path="/" component={App} />
    <Route path="/login" component={Login} />
    <Route path="/signup" component={SignUp} />
    <Route path="/register-bank" component={ReigsterBank} />
  </Router>
);

ReactDOM.render(<Jumbotron>{routing}</Jumbotron>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
