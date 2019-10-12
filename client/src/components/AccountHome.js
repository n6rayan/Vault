import React, { Component } from 'react';

import Navigation from './Navigation/Navigation';

export default class AccountHome extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <Navigation updateUser={this.props.updateUser} username={this.props.username} />
    );
  }
}