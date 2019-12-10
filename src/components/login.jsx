import { UserStore } from '../store/user.store';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import '../css/login.css';

@observer
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: 'error__false'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userStore = new UserStore();
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        };
        this.userStore.loginUser(user, () => { window.location.href = '/upload'; }, () => this.setState({
            error: this.userStore.error ? 'error' : 'error__false'
        }));
    }

    render() {
        return (
            <div className="login__bg">
                <div className="container">
                    <div className="col-lg-5 offset-lg-3 col-sm-8 offset-sm-2 col-12">
                        <div className="card mt-6">
                            <form className="card-body p-4" onSubmit={this.handleSubmit}>
                                <h3 className="text-center">Sign In</h3>
                                <div className={this.state.error}>
                                    <p>Incorrect username or password.</p>
                                </div>
                                <div>
                                    <div className="form-group mb-3">
                                        <label>Email address</label>
                                        <input className="form-control" type="email" required={true} name="email" onChange={this.handleInputChange} value={this.state.email} placeholder="Enter your email" />
                                    </div>

                                    <div className="form-group mb-3">
                                        <label>Password</label>
                                        <input className="form-control" type="password" required={true} name="password" onChange={this.handleInputChange} value={this.state.password} placeholder="Enter your password" />
                                        <Link to="/forgot" className="forgot">Forgot Password?</Link>
                                    </div>

                                    <div className="form-group mb-0 text-center">
                                        <button className="btn btn-primary btn-block" type="submit"> Log In </button>
                                    </div>

                                </div>
                                <div className="text-center mt-4">
                                    <Link to="/registr" className="registr">SignUp</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { Login };