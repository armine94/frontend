import React, { Component } from 'react';
import {Upload} from './Upload';
import {Login} from './Login';


class Home extends Component {
    render() {
        const authLinks = (
            <Upload/>
        );

        const guestLinks = (
            <Login/>
        )

        return (
            <div>
              {sessionStorage.getItem('token') ? authLinks : guestLinks}
            </div>
        );
    }
}

export {Home};
