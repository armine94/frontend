import { UserStore } from '../store/user.store';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import '../css/navbar.css';

@observer
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: 'drawer-closed'
        };
        this.userStore = new UserStore();
    }

    changeClassName = () => {
        if (this.state.isActive === 'drawer') {
            this.setState({ isActive: 'drawer-closed' });
        } else if (sessionStorage.getItem('email')) {
            this.setState({ isActive: 'drawer' });
        }
    }

    onLogout = () => {
        const email = { 'email': sessionStorage.getItem('email') };
        this.userStore.logoutUser(email);
        sessionStorage.removeItem('email');
    }

    render() {
        const authLinks = (
            <>
                <div className="authLinks">
                    <div className="icon">
                        <i className="far fa-user-circle" onClick={this.changeClassName}></i>
                    </div>
                    <div className={this.state.isActive} >
                        <div className="drawer__content">
                            <i className="fas fa-times icon__close" value="close" onClick={this.changeClassName}></i>
                            <img className="bg-img drawer__image" alt="img" src={sessionStorage.getItem('imageUrl')} />
                            <h4>{sessionStorage.getItem('name')} {sessionStorage.getItem('surname')}</h4>
                            <h6>{sessionStorage.getItem('email')}</h6>
                            <h6>{sessionStorage.getItem('bDay')}</h6>
                            <Link className="nav__link" to="/">
                                <button className="btn btn__default btn__logout" onClick={this.onLogout}>Logout</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <Link className="nav__link" to="/view" >
                    <button className="btn btn__default login__btn">View</button>
                </Link>
                <Link className="nav__link" to="/upload" >
                    <button className="btn btn__default login__btn">Upload</button>
                </Link>
            </>
        );

        const guestLinks = (
            <>
                <Link className="nav__link" to="/"><button className="btn btn__default login__btn">Sign In</button></Link>
                <Link className="nav__link" to="/registr"><button className="btn btn__default login__btn">Sign Up</button></Link>
            </>
        );

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-expand-sm navbar-expand navbar-expand-md navbar-light " >
                    <div className="collapse navbar-collapse navbar__content">
                        {this.userStore.login || sessionStorage.getItem('email') ? authLinks : guestLinks}
                    </div>
                </nav>
            </div>
        );
    }
}

export { Navbar };