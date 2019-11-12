import React, { Component } from 'react';

import axios from 'axios';
import { Button, Card } from 'react-bootstrap';
import { saveAs } from 'file-saver';

export default class Accounts extends Component {

  constructor(props) {
    super(props);

    this.state = {
      accounts: []
    };

    this.downloadLatestStatement = this.downloadLatestStatement.bind(this);
  }

  async componentDidMount() {
    const accounts = await axios({
      method: 'GET',
      url: 'http://vault.io:3001/api/starling/accounts',
      withCredentials: true
    });

    this.setState({ accounts: accounts.data });
  }

  async downloadLatestStatement(accountId) {
    const statement = await axios({
      method: 'GET',
      url: `http://vault.io:3001/api/starling/statement/${accountId}`,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/pdf',
        'Accept': 'application/pdf',
      },
      responseType: 'blob'
    });

    const pdf = new Blob([statement.data], { type: 'application/pdf;charset=utf-8' });

    return saveAs(pdf, `${accountId}-statement.pdf`);
  }

  render() {
    const accounts = this.state.accounts;
    
    const cards = accounts.map((account, idx) =>
      <Card key={idx}>
        <Card.Body>
          <Card.Title>{account.name}</Card.Title>
          <Card.Text>
            <b>Account Number</b>: {account.accNumber}
            <br />
            <b>Sort Code</b>: {account.sortCode}
          </Card.Text>
          <Card.Text><b>Balance</b>: {account.currency === 'GBP' ? '£' : '€'}{account.balance}</Card.Text>
          <Button onClick={() => this.downloadLatestStatement(account.uid)}>Download Statement</Button>
        </Card.Body>
      </Card>
    );

    return cards;
  }
}