import {extendObservable, action} from 'mobx';
import { userAPI } from '../DAO/user.DAO';

let instance = null;
class UserStore {
    initialState = {
        email: '',
        status: '',
        login: sessionStorage.getItem('email'),
        error: false,
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
    loginUser = (user, cb, cb2) => {
        userAPI.loginUser(user)
        .then((res) => {
            if(!res.data.error) {
                this.login = true;
                this.status = res.status;
                this.email = res.data.email;
                sessionStorage.setItem('email', res.data.email);
                cb && cb();
            } else {
                this.status = res.status;
                this.error = true;
                cb2 && cb2();

            }
        })
        .catch((error) => this.error = true);
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
        .catch((error) => this.error = true);
    }
}

export { UserStore };