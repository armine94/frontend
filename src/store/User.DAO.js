import axios from 'axios';
import {HOST} from '../config';
import Cookies from 'universal-cookie';

import {extendObservable, action} from 'mobx';
import { APIClient } from '../APIClient/APIClient';

class UserStore {
    constructor () {
        extendObservable(this, {
            status: '',
            login: false,
            logout: true,
            registr: '',
        });
    }

    @action
    registrUser = (user) => {
        APIClient.registrUser(user)
        .then((res) => {
            this.registr = true;
        })
        .catch((err) => console.log(err)
        );
    }

    loginUser = (user) => {
        APIClient.loginUser(user)
            .then((res) => {
                this.login = true;
                this.logout = false;
                this.status = res.status;
                const { token, email } = res.data;
                const cookies = new Cookies();
                cookies.set('token', token, { path: '/' });
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('email', email);
            })
            .catch((err) => console.log(err)
            );
    }
    
    logoutUser = (email) => {
        APIClient.logoutUser(email)
            .then((res) => {
                this.login = false;
                this.logout = true;
                cookies.remove('token');
                console.log(cookies.get('token'));
                sessionStorage.removeItem('token'); 
                sessionStorage.removeItem('email');     
            })
            .catch((err) => console.log(err)
            );
    }
}

export { UserStore };



// const userLogin =  (user) => {
//     const url = HOST + '/users/login';
//     return axios.post(url, user, {Credentials: true})
//     .then( res => {
//         const { token, email } = res.data;
//         const cookies = new Cookies();
//         cookies.set('token', token, { path: '/' });
//         //console.log(cookies.get('token'));
//         sessionStorage.setItem('token', token);
//         sessionStorage.setItem('email', email);
//         return true;
//     })
//     .catch(err => {
//         return false;
//         alert(err)
//     });
// }

// const userLogout =  (email) => {
//     const url = HOST + '/users/logout';
//     return axios.post(url, email)
//     .then( res => {            
//         return res.status;
//     })
//     .catch(err => {
//         return false;
//         alert(err)
//     });
// }

//export {userLogin};
//export {userLogout};


