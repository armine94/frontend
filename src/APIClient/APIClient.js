import {apiConstants} from './apiConstants';
import axios from 'axios';

export const APIClient = {
    //========= Images ================= 
    uploadImage(data) {
        return axios.post(apiConstants.imgUrl, data, {withCredentials: true,});
    },

    getImages(pageNumber, size) {
        return axios.get(apiConstants.imgUrl, {
            params: {
                pageNumber: pageNumber,
                size: size,
            },
        })
    },

    //========== USERS =================
    loginUser(user) {
        return axios.post(apiConstants.userLoginUrl, user, {withCredentials: true,})
    },
    logoutUser(email) {
        return axios.post(apiConstants.userLogoutUrl, email, {withCredentials: true,});
    },
    registrUser(user) {
        return axios.post(apiConstants.userRegistertUrl, user, {withCredentials: true,})
    }
}
