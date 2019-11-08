import React, { Component } from 'react';

import axios from 'axios';

export default class Transactions extends Component {

  constructor(props) {
    super(props);

    this.state = {
    };
  }

  async componentDidMount() {
    const accounts = await axios({
      method: 'GET',
      url: 'http://vault.io:3001/api/starling/accounts',
      withCredentials: true
    });

    this.setState(accounts);
  }

  render() {
    console.log(this.state);
    return <h1>Transactions</h1>;
  }
}