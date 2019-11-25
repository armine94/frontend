import { UserStore } from '../store/user.store';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import '../css/registration.css';

@observer
class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            email: '',
            password: '',
            password_confirm: '',
            errors: {}
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.userStore = new UserStore();
    }

    handleInputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password,
            password_confirm: this.state.password_confirm
        }
        this.userStore.registerUser(user, () => this.props.history.push('/login'));
    }

    render() {
        return (
            <div className="container-fluid " id="container">
                <div className="row">
                    <div className="offset-md-4 offset-sm-3 offset-3 col-md-4 col-sm-6 col-6 ">
                        <h2 className='register__title'>Registration</h2>
                        <form className="register" onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input className="register__input"
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    onChange={this.handleInputChange}
                                    value={this.state.name}
                                />
                            </div>
                            <div className="form-group">
                                <input className="register__input"
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={this.handleInputChange}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="form-group">
                                <input className="register__input"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.handleInputChange}
                                    value={this.state.password}
                                />
                            </div>
                            <div className="form-group">
                                <input className="register__input"
                                    type="password"
                                    placeholder="Confirm Password"
                                    name="password_confirm"
                                    onChange={this.handleInputChange}
                                    value={this.state.password_confirm}
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary register__submit">
                                    Register
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export { Register };