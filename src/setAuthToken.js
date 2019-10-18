import axios from 'axios';

const setAuthToken = (token, email) => {
    if(token) {
        axios.defaults.headers.common['Authorization'] = token;
        axios.defaults.headers.common['Author'] = email;
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
        delete axios.defaults.headers.common['Author'];
    }
}

export default setAuthToken;