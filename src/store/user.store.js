import {extendObservable, action} from 'mobx';
import { userAPI } from '../DAO/user.DAO';

let instance = null;
class UserStore {
    initialState = {
        name: '',
        surname: '',
        email: '',
        bDay: '',
        imageUrl: '',
        status: '',
        login: sessionStorage.getItem('email'),
        error: '',
        forgot: false
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
        .then(() => {
            cb();
        })
        .catch((error) => { this.error = error; });
    }

    @action
    loginUser = (user, cb, cb2) => {
        userAPI.loginUser(user)
        .then((res) => {
            if(!res.data.error) {
                this.login = true;
                this.status = res.status;
                this.name = res.data.name;
                this.bDay = res.data.bDay;
                this.email = res.data.email;
                this.surname = res.data.surname;
                this.imageUrl = res.data.imageUrl;
                sessionStorage.setItem('name', res.data.name);
                sessionStorage.setItem('surname', res.data.surname);
                sessionStorage.setItem('bDay', res.data.bDay);
                sessionStorage.setItem('email', res.data.email);
                sessionStorage.setItem('imageUrl', res.data.imageUrl);
                cb();
            } else {
                this.status = res.status;
                this.error = true;
                cb2();
            }
        })
        .catch(() => {
            this.error = true;
        });
    }
    
    @action
    logoutUser = (email) => {
        userAPI.logoutUser(email)
        .then((res) => {
            if(res.data === 'Ok') {
                sessionStorage.removeItem('email');
                sessionStorage.removeItem('bDay');
                sessionStorage.removeItem('surname');
                sessionStorage.removeItem('imageUrl');
                sessionStorage.removeItem('name');
                this.login = false;
                this.name = '';
                this.bDay = '';
                this.email = '';
                this.surname = '';
                this.imageUrl = '';
            }
        })
        .catch((error) => { this.error = error; });
    }

    @action
    forgotEmail = (data, cb) => {
        userAPI.forgotEmail(data)
        .then( res => {
            if(!res.data.error) {
                this.forgot = true;
                this.email = data.email;
            } else {
                cb();
            }
            
        })
        .catch(() => {
            cb();            
        });
    }

    @action
    forgotPassword = (password, cb) => {
        const data = {
            password: password,
            email: this.email
        };
        userAPI.forgotPassword(data)
        .then( () => {
            cb();
        })
        .catch(() => {
            cb();           
        });
    }
}

export { UserStore };