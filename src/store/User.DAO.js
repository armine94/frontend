import Cookies from 'universal-cookie';

import {extendObservable, action} from 'mobx';
import { APIClient } from '../APIClient/APIClient';

let instance = null

class UserStore {
    initialState = {
        status: '',
        login: false,
        register: '',
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
        APIClient.registerUser(user)
        .then((res) => {
            this.register = true;
            cb && cb();
        })
        .catch((err) => console.log(err)
        );
    }

    @action
    loginUser = (user, cb) => {
        APIClient.loginUser(user)
            .then((res) => {
                this.login = true;
                this.status = res.status;
                const { email } = res.data;
                sessionStorage.setItem('email', email);
                cb && cb();
            })
            .catch((err) => console.log(err)
            );
    }
    
    @action
    logoutUser = (email) => {
        alert(55)
        APIClient.logoutUser(email)
            .then((res) => {
                alert(1)
                this.login = false;
                this.logout = true;    
            })
            .catch((err) => console.log(err)
            );
    }
}

export { UserStore };
