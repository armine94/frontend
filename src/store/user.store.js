import {extendObservable, action} from 'mobx';
import { userAPI } from '../DAO/user.DAO';

let instance = null;
class UserStore {
    initialState = {
        email: '',
        status: '',
        login: sessionStorage.getItem('email'),
        error: '',
    }

    constructor () {
        extendObservable(this, this.initialState);
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    @action
    registerUser = (user, cb) => {
        userAPI.registerUser(user)
        .then((res) => {
            cb && cb();
        })
        .catch((error) => this.error = error);
    }

    @action
    loginUser = (user, cb) => {
        userAPI.loginUser(user)
        .then((res) => {
            if(res.status === 200) {
                this.login = true;
                this.status = res.status;
                this.email = res.data.email;
                sessionStorage.setItem('email', res.data.email);
                cb && cb();
            } else {
                this.status = res.status;
            }
        })
        .catch((error) => this.error = error);
    }
    
    @action
    logoutUser = (email) => {
        userAPI.logoutUser(email)
        .then((res) => {
            if(res.data === 'Ok') {
                sessionStorage.removeItem('email');
                this.login = false;
                this.email = "";
            }
        })
        .catch((error) => this.error = error);
    }
}

export { UserStore };