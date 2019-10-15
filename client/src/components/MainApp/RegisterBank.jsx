import React from 'react';
import { ListGroup } from 'react-bootstrap';

import starlingLogo from '../../assets/images/starling/StarlingBank.png';
import monzoLogo from '../../assets/images/monzo/Monzo.png';
import revolutLogo from '../../assets/images/revolut/Revolut.png';

const RegisterBank = () => {
  return (
    <div>
      <ListGroup>
        <ListGroup.Item action href="http://localhost:3001/api/starling/oauth/login">
          <img src={starlingLogo} width="50px" height="50px" alt="Starling" /> Starling
          </ListGroup.Item>
        <ListGroup.Item action href="http://localhost:3001/...">
          <img src={revolutLogo} width="50px" height="50px" alt="Revolut" /> Revolut
          </ListGroup.Item>
        <ListGroup.Item action href="http://localhost:3001/...">
          <img src={monzoLogo} width="50px" height="50px" alt="Monzo" /> Monzo
          </ListGroup.Item>
      </ListGroup>
    </div>
  );
}

export default RegisterBank;