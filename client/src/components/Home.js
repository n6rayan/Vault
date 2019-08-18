import React, { Component } from 'react';
import '../assets/Home.css';

export class Home extends Component {

  render = () => {
    return (
      <div>
        <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet"></link>
        <div class="LoginTopRight" align="right">
            <p>Already registered? <a href="/login">Login</a></p>
        </div>
        <div class="CenterPage" align="center">
          <h1>Vault</h1>
          <p>Welcome to Vault, your centralised banking application!</p>
          
          <button href="/signup">Get Started</button>
        </div>
      </div>
    );
  }
}