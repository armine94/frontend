import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import {userLogout} from './Login.DAO';

class Navbar extends Component {
    constructor(props) {
        super(props);         
    }

    onLogout(e) {
        const email = {"email": sessionStorage.getItem('email')};
        userLogout(email)
        .then(result => {
            if(result == 200){
                sessionStorage.removeItem('token'); 
                sessionStorage.removeItem('email');              
            } else {
                alert(result);
            }
        })
        .catch(err => {
            alert(err)
        })
    }

    render() {
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <Link  className="nav-link" to="/view" >
                     View All
                </Link>
                <Link  className="nav-link" to="/upload" >
                     Upload
                </Link>
                <Link  className="nav-link" to="/login"  onClick={this.onLogout.bind(this)}>
                     Logout
                </Link>
            </ul>
        )
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login" onClick={this.sign}>Sign In</Link>
            </li>
        </ul>
      )
        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {sessionStorage.getItem('token')? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}

export {Navbar};
