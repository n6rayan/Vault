import React, { Component } from 'react';

import TopNav from './Navigation/TopNav';

export default class AccountHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <TopNav updateUser={this.props.updateUser} />
    );
  }
}