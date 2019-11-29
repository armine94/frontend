import { UserStore } from '../store/user.store';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import "../css/navbar.css";

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
            <>
                <Link className="nav__link" to="/view" >
                    <button className="btn btn__default login__btn">View</button>
                </Link>
                <Link className="nav__link" to="/upload" >
                    <button className="btn btn__default login__btn">Upload</button>
                </Link>
                <Link className="nav__link" to="/">
                    <button className="btn btn__default login__btn" onClick={this.onLogout}>Logout</button>
                </Link>
            </>
        )

        const guestLinks = (
            <>
                <Link className="nav__link" to="/"><button className="btn btn__default login__btn">Sign In</button></Link>
                <Link className="nav__link" to="/register"><button className="btn btn__default login__btn">Sign Up</button></Link>
            </>
        )

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-expand-sm navbar-expand navbar-expand-md navbar-light " >
                    <div className="collapse navbar-collapse navbar__content">
                        {this.userStore.login || sessionStorage.getItem('email') ? authLinks : guestLinks}
                    </div>
                </nav>
            </div>
        )
    }
}

export { Navbar };