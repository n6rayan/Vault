import React, { Component } from 'react';

import axios from 'axios';
import { Button, Form, Navbar, Nav } from 'react-bootstrap';

export default class TopNav extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.logout = this.logout.bind(this);
  }

  async logout(event) {
    event.preventDefault();

    const options = {
      method: 'GET',
      url: 'http://localhost:3001/api/logout',
      withCredentials: true
    };

    const response = await axios(options);

    if (response.data.success) {
      this.props.updateUser({ loggedIn: 0 });
    }
  }

  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">Vault</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/register-bank">Add Account</Nav.Link>
            <Nav.Link href="/transactions">Transactions</Nav.Link>
          </Nav>
          <Form inline>
            <Nav.Link href="/account">My Account</Nav.Link>
            <Button variant="outline-success" onClick={this.logout}>Logout</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}