import React, { Component } from 'react';

import axios from 'axios';
import { Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default class Navigation extends Component {
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
      <Navbar bg="light" expand="lg" sticky="top">
        <Navbar.Brand href="/">Vault</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/transactions">Transactions</Nav.Link>
          </Nav>
          <Form inline>
            <Navbar.Text>Hello, {this.props.username}</Navbar.Text>
            <NavDropdown title="My Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/account">Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="/register-bank">Add Bank</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}