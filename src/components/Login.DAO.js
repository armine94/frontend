import axios from 'axios';
import {HOST} from '../config';
import setAuthToken from '../setAuthToken';


const userLogin =  (user) => {
    const url = HOST + '/users/login';
    return axios.post(url, user)
    .then( res => {
        const { token, email } = res.data;
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('email', email);
        setAuthToken(token, email);
        return true;
    })
    .catch(err => {
        return false;
        alert(err)
    });
}

const userLogout =  (email) => {
    const url = HOST + '/users/logout';
    return axios.post(url, email)
    .then( res => {            
        setAuthToken("", "");
        return res.status;
    })
    .catch(err => {
        return false;
        alert(err)
    });
}

export {userLogin};
export {userLogout};


