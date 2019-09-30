import React, { Component } from 'react';
import { ListGroup } from 'react-bootstrap';

import Navigation from './Navigation/Navigation';

import starlingLogo from '../assets/images/starling/StarlingBank.png';
import monzoLogo from '../assets/images/monzo/Monzo.png';
import revolutLogo from '../assets/images/revolut/Revolut.png';

export default class RegisterBank extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    return (
      <div>
        <Navigation updateUser={this.updateUser} username={this.props.username} />
        <br></br>
        {/* <h1 style={{ fontSize: '50px' }}>Register Bank</h1><br /> */}

        <ListGroup>
          <ListGroup.Item>
            <img src={starlingLogo} width="50px" height="50px" alt="Starling" /> Starling
          </ListGroup.Item>
          <ListGroup.Item>
            <img src={revolutLogo} width="50px" height="50px" alt="Revolut" /> Revolut
          </ListGroup.Item>
          <ListGroup.Item>
            <img src={monzoLogo} width="50px" height="50px" alt="Monzo" /> Monzo
          </ListGroup.Item>
        </ListGroup>

        {/* <Container>
          <Row>
            <Col>
              <Card style={{ width: '18rem' }} className="text-center">
                <Card.Img variant="top" src={starlingLogo} />
                <Card.Body>
                  <Button href="http://localhost:3001/api/starling/oauth/login" variant="primary">Authenticate Starling</Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container> */}
      </div>
    );
  }
}