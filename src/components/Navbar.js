import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import {UserStore} from '../store/User.DAO';
import {UploadStore} from '../store/Upload.DAO';


@observer
class Navbar extends Component {
    constructor(props) {
        super(props); 
        this.userStore = new UserStore();    
        this.uploadStore = new UploadStore();    

    }

    onLogout() {
        const email = {"email": sessionStorage.getItem('email')};
        this.userStore.logoutUser(email);
        sessionStorage.removeItem('email'); 
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
                <Link  className="nav-link" to="/login" onClick={this.onLogout.bind(this)}>
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
                    {this.userStore.login && !this.uploadStore.err? authLinks : guestLinks}
                </div>
            </nav>
        )
    }
}

export {Navbar};
