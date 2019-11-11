import React, { Component } from 'react';

import axios from 'axios';
import { Card, Container, Row } from 'react-bootstrap';

export default class Accounts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accounts: []
    };
  }

  async componentDidMount() {
    const accounts = await axios({
      method: 'GET',
      url: 'http://vault.io:3001/api/starling/accounts',
      withCredentials: true
    });

    this.setState({ accounts: accounts.data });
  }

  render() {
    const accounts = this.state.accounts;
    
    const cards = accounts.map(account =>
      <Card>
        <Card.Body>
          <Card.Title>{account.name}</Card.Title>
          <Card.Text>
            <b>Account Number</b>: {account.accNumber}
            <br />
            <b>Sort Code</b>: {account.sortCode}
          </Card.Text>
          <Card.Text><b>Balance</b>: £{account.balance}</Card.Text>
        </Card.Body>
      </Card>
    );

    return (<Container>{cards}</Container>);
  }
}