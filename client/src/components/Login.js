import React, { Component } from 'react';

export default class Login extends Component {

  render = () => {
    return (
      <div className="CenterPage" align="center">
        <form method="post" action="index.html">
          <div class="box">
            <h1>Login</h1>

            <input type="email" name="email" value="email" class="email" />
            <input type="password" name="email" value="email" class="email" />

            <a href="/">Login</a>
            <a href="/">Cancel</a>
          </div>
        </form>
      </div>
    );
  }
}