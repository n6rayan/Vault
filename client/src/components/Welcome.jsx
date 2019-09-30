import React from 'react';
import { Button } from 'react-bootstrap';

const Welcome = () => {
  return (
    <div>
      <div align="right">
        <p>Already registered? <a href="/login">Login</a></p>
      </div>

      <div className="CenterPage" align="center">
        <h1>Vault</h1><br />

        <p>Welcome to Vault, your centralised banking application!</p><br />

        <Button variant="primary" href="/signup">Get Started</Button>
      </div>
    </div>
  );
};

export default Welcome;
