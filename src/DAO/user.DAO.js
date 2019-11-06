import axios from 'axios';
import { apiConfigs} from './apiConfigs'

export const userAPI = {
    loginUser(user) {
        return axios.post(apiConfigs.userLoginUrl, user)
    },
    logoutUser(email) {
        return axios.post(apiConfigs.userLogoutUrl, email);
    },
    registerUser(user) {
        return axios.post(apiConfigs.userRegisterUrl, user)
    }
}
