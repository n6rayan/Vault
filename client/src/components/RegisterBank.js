import React, { Component } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import TopNav from './Navigation/TopNav';

import starlingLogo from '../assets/images/starling/StarlingBank.png';

export default class RegisterBank extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <TopNav updateUser={this.props.updateUser} />
        <h1 style={{ fontSize: '50px' }}>Register Bank</h1><br />

        <Container>
          <Row>
            <Col>
              <Card style={{ width: '18rem' }} className="text-center">
                <Card.Img variant="top" src={starlingLogo} />
                <Card.Body>
                  <Button href="http://localhost:3001/api/starling/oauth/login" variant="primary">Authenticate Starling</Button>
                </Card.Body>
              </Card>
            </Col>

            {/* <Col>
              <Card style={{ width: '18rem' }} className="text-center">
                <Card.Img variant="top" src={starlingLogo} />
                <Card.Body>
                  <Button href="http://localhost:3001/api/starling/oauth/login" variant="primary">Authenticate Starling</Button>
                </Card.Body>
              </Card>
            </Col>

            <Col>
              <Card style={{ width: '18rem' }} className="text-center">
                <Card.Img variant="top" src={starlingLogo} />
                <Card.Body>
                  <Button href="http://localhost:3001/api/starling/oauth/login" variant="primary">Authenticate Starling</Button>
                </Card.Body>
              </Card>
            </Col> */}
          </Row>
        </Container>
      </div>
    );
  }
}