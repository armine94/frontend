import React, { Component } from 'react';
import { observer } from 'mobx-react';
import {UserStore} from '../store/User.DAO';
import '../css/Login.css'

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

    loginUser =  (user) => {
        this.userStore.loginUser(user);   
        const { login } = this.userStore;
        if(login) {
            this.props.history.push('/upload')
        }
    }

    render() {
        return(
        <div className="container-fluid" id="container" >
            <h2>Login</h2>
            <form onSubmit={ this.handleSubmit }>
                <div className="form-group">
                    <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={ this.handleInputChange }
                    value={ this.state.email }
                    />
                </div>
                <div className="form-group">
                    <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={ this.handleInputChange }
                    value={ this.state.password }
                    />
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-primary" >
                        Login User
                    </button>
                </div>
            </form>
        </div>
        )
    }
}

export {Login} ;
