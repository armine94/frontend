import {extendObservable, action} from 'mobx';
import { userAPI } from '../DAO/user.DAO';

let instance = null;
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
        userAPI.registerUser(user)
        .then((res) => {
            this.register = true;
            cb && cb();
        })
        .catch((err) => console.log(err)
        );
    }

    @action
    loginUser = (user, cb) => {
        userAPI.loginUser(user)
        .then((res) => {
            if(res.status === 200) {
                this.login = true;
                this.status = res.status;
                const { email } = res.data;
                sessionStorage.setItem('email', email);
                cb && cb();
            } else {
                this.status = res.status;
            }
        })
        .catch((err) => console.log(err)
        );
    }
    
    @action
    logoutUser = (email) => {
        userAPI.logoutUser(email)
        .then((res) => {
            this.login = false;
            this.logout = true;    
        })
        .catch((err) => console.log(err)
        );
    }
}

export { UserStore };