import React, { Component } from 'react';
import Upload from './Upload';

export default class Home extends Component {
  render() {
    const isAuthenticated = localStorage.jwtToken;

    const authLinks = (
      <Upload/>
    );

    const guestLinks = (
      <div>Home</div>
    )

    return (
      <div >
        {isAuthenticated ? authLinks : guestLinks}
      </div>
    );
  }
}
