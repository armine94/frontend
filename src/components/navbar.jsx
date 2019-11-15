import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import { UserStore } from '../store/user.store';

@observer
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.userStore = new UserStore();
    }

    onLogout() {
        const email = { "email": sessionStorage.getItem('email') };
        this.userStore.logoutUser(email);
        sessionStorage.removeItem('email');
    }

    render() {
        const authLinks = (
            <ul className="navbar-nav ml-auto bg-light rounded-top rounded-bottom">
                <Link className="nav-link" to="/view" >
                    View All
                </Link>
                <Link className="nav-link" to="/upload" >
                    Upload
                </Link>
                <Link className="nav-link" to="/login" onClick={this.onLogout.bind(this)}>
                    Logout
                </Link>
            </ul>
        )
        const guestLinks = (
            <ul className="navbar-nav ml-auto bg-light rounded-top rounded-bottom" >
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Sign Up</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/login" onClick={this.sign}>Sign In</Link>
                </li>
            </ul>
        )
        return (
            <nav className="navbar navbar-expand-lg navbar-light " >
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {this.userStore.login ? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}

export { Navbar };