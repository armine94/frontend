import { UserStore } from '../store/user.store';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';

@observer
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.userStore = new UserStore();
    }

    onLogout = () => {
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
                <Link className="nav-link" to="/login" onClick={this.onLogout}>
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
                    <Link className="nav-link" to="/login">Sign In</Link>
                </li>
            </ul>
        )

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-expand-sm navbar-expand navbar-expand-md navbar-light " >
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <div id="drawerOpener" onClick={this.changeClassName}>
                            <i className="fas fa-bars " ></i>
                        </div>
                        {this.userStore.login || sessionStorage.getItem('email') ? authLinks : guestLinks}
                    </div>
                </nav>
            </div>
        )
    }
}

export { Navbar };