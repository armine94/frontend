import axios from 'axios';
import { apiConfigs} from '../config/apiConfigs'

export const userAPI = {
    loginUser(user) {
        return axios.post(apiConfigs.userLoginUrl, user, { withCredentials: true })
    },
    logoutUser(email) {
        return axios.post(apiConfigs.userLogoutUrl, email, { withCredentials: true });
    },
    registerUser(user) {
        return axios.post(apiConfigs.userRegisterUrl, user)
    }
}
