import { UserStore } from '../store/user.store';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { observer } from 'mobx-react';
import '../css/registration.css';

@observer
class Register extends Component {

    constructor() {
        super();
        this.state = {
            password_confirm: '',
            errorPassword: 'error__false',
            password: '',
            surname: '',
            image: null,
            index: 0,
            gender: '',
            name: '',
            email: '',
            bDay: ''
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

    onChangeHandler = event => {
        const image = event.target.files;
        this.setState({
            image: image
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (this.state.password === this.state.password_confirm) {
            const data = new FormData();
            data.append('file', this.state.image[this.state.index]);
            data.append('bDay', this.state.bDay);
            data.append('name', this.state.name);
            data.append('email', this.state.email);
            data.append('surname', this.state.surname);
            data.append('password', this.state.password);
            data.append('password_confirm', this.state.password_confirm);
            this.userStore.registerUser(data, () => { window.location.href = '/'; });
        } else {
            this.setState({errorPassword: 'error__password'});
        }
    }

    render() {
        return (
            <div className="registr__bg">
                <div className="container">
                    <div className="col-lg-5 offset-lg-3 col-sm-8 offset-sm-2 col-12">
                        <div className="card mt-5">
                            <div className="card-body p-4">
                                <h4 className="text-center">Sign Up</h4>
                                <form action="" onSubmit={this.handleSubmit}>
                                    <div className="form-group mb-2">
                                        <label>Upload Image </label>
                                        <input type="file" className="form-control" required={true} accept=".jpg, .png" onChange={this.onChangeHandler} />
                                    </div>
                                    <div className="form-group mb-2">
                                        <label className="label">Name</label>
                                        <input className="form-control" required={true} name="name" pattern=".{2,}" title="2 characters minimum" onChange={this.handleInputChange} value={this.state.name} placeholder="Enter your email" />
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="label">Surname</label>
                                        <input className="form-control" required={true} name="surname" pattern=".{3,}" title="3 characters minimum" onChange={this.handleInputChange} value={this.state.surname} placeholder="Enter your email" />
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="label">Email address</label>
                                        <input className="form-control" type="email" required={true} name="email" onChange={this.handleInputChange} value={this.state.email} placeholder="Enter your email" />
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="label">Password</label>
                                        <input className="form-control" type="password" required={true} pattern=".{6,}" title="6 characters minimum" name="password" onChange={this.handleInputChange} value={this.state.password} placeholder="Enter your password" />
                                    </div>

                                    <div className="form-group mb-2">
                                        <label className="label"> Confirm Password</label>
                                        <input className="form-control" type="password" required={true} pattern=".{6,}" title="6 characters minimum" name="password_confirm" onChange={this.handleInputChange} value={this.state.password_confirm} placeholder="Enter your password" />
                                    </div>
                                    <div className={this.state.errorPassword}>
                                        <p>Passwords do not match</p>
                                    </div>

                                    <div >
                                        <label className="label">Birth Day</label>
                                        <input type="date" name="bDay" className="form-control"
                                            min="1940-01-01"
                                            max="2019-12-31"
                                            required={true}
                                            onChange={this.handleInputChange}
                                        />
                                    </div>

                                    <div className="form-group mt-3 text-center">
                                        <button className="btn btn-primary btn-block" type="submit"> Registration </button>
                                    </div>

                                </form>
                                <div className="text-center mt-2">
                                    <Link to="/" className="login">Sign In</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { Register };