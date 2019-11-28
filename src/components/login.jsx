import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { UserStore } from '../store/user.store';
import '../css/login.css';

@observer
class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
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
            email: this.state.email,
            password: this.state.password,
        }
        this.loginUser(user);
    }

    loginUser = (user) => {
        this.userStore.loginUser(user, () => this.props.history.push('/upload'));
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="bg-img">
                        <form className='login' onSubmit={this.handleSubmit}>
                            <div className='login__title'>
                                <h2>Login</h2>
                            </div>
                            <div className="form-group">
                                <input className="login__input"
                                    type="email"
                                    placeholder="Email"
                                    name="email"
                                    onChange={this.handleInputChange}
                                    value={this.state.email}
                                />
                            </div>
                            <div className="form-group">
                                <input className="login__input"
                                    type="password"
                                    placeholder="Password"
                                    name="password"
                                    onChange={this.handleInputChange}
                                    value={this.state.password}
                                />
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary login__submit" >
                                    Login
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div >
        )
    }
}

export { Login };
