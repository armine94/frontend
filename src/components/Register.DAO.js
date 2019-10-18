import axios from 'axios';
import {HOST} from '../config';

const userRegister = (user) => {
    const url = HOST + '/users/register';
    return axios.post(url, user)
    .then( res => {
        return res.status;
    })
    .catch(err => {
        alert(err)
        return false;
    });
}

export {userRegister};
