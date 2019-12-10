import { UserStore } from '../store/user.store';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import '../css/forgot.css';

@observer
class Forgot extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.userStore = new UserStore();
    }

    handleInputChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: this.state.email
        };
        this.userStore.forgotEmail(data, () => { alert(5); });
    }

    changePassword = (e) => {
        e.preventDefault();
        if (this.state.password.length) {
            this.userStore.forgotPassword(this.state.password, () => { window.location.href = '/'; });
        }
    }

    cancel = () => {
        window.location.href = '/';
        this.userStore.forgot = false;
    }
    render() {
        const emailInput = (
            <div className="forgot__bg">
                <div className="container">
                    <div className="col-lg-5 offset-lg-3 col-sm-8 offset-sm-2 col-12">
                        <div className="card mt__8">
                            <div className="card-body p-4" >
                                <h5 className="text-center"> Find your account </h5>
                                <form onSubmit={this.handleSubmit}>

                                    <div className="form-group mb-3">
                                        <label>Email address</label>
                                        <input className="form-control" required={true} type="email" name="email" onChange={this.handleInputChange} value={this.state.email} placeholder="Enter your email" />
                                    </div>

                                    <div className="search">
                                        <button className="btn btn-primary button" type="submit"> Search </button>
                                        <Link to="/" className="button button__cancel">Cancel</Link>
                                    </div>

                                </form >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

        const passwordInput = (
            <div className="forgot__bg">
                <div className="container">
                    <div className="col-lg-5 offset-lg-3 col-sm-8 offset-sm-2 col-12">
                        <div className="card mt__8">
                            <div className="card-body p-4">
                                <h5 className="text-center">  Change password </h5>
                                <form onSubmit={this.changePassword}>

                                    <div className="form-group mb-3">
                                        <label>Enter new password</label>
                                        <input className="form-control" type="password" name="password" pattern=".{6,}" title="6 characters minimum" onChange={this.handleInputChange} value={this.state.password} placeholder="password" />
                                    </div>

                                    <div className="search">
                                        <button className="btn btn-primary button" type="submit"> Change </button>
                                        <Link to="/" className="button button__cancel">Cancel</Link>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        return (
            this.userStore.forgot ? passwordInput : emailInput
        );
    }
}

export { Forgot };