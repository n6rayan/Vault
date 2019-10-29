import React, { PureComponent } from 'react';

import axios from 'axios';
import { Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';

export default class Navigation extends PureComponent {
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

      window.location.href = "/";
    }
  }

  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Navbar.Brand href="/account">Vault</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="/account/transactions">Transactions</Nav.Link>
          </Nav>
          <Form inline>
            <NavDropdown title="My Account" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/account">Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="/account/register-bank">Add Bank</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={this.logout}>Logout</NavDropdown.Item>
            </NavDropdown>
            <Navbar.Text>Hello, {this.props.username}</Navbar.Text>
          </Form>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}