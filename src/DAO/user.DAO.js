import axios from 'axios';
import { apiConfigs} from '../config/apiConfigs';

export const userAPI = {
    loginUser(user) {
        return axios.post(apiConfigs.userLoginUrl, user, { withCredentials: true });
    },
    logoutUser(email) {
        return axios.post(apiConfigs.userLogoutUrl, email, { withCredentials: true });
    },
    registerUser(user) {
        return axios.post(apiConfigs.userRegisterUrl, user, { withCredentials: true });
    },
    forgotEmail(email) {
        return axios.post(apiConfigs.forgotEmail, email, { withCredentials: true });
    },
    forgotPassword(data) {
        return axios.post(apiConfigs.forgotPassword, data, { withCredentials: true });
    }

};