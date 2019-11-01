import { apiConstants } from './apiConstants';
import axios from 'axios';

export const APIClient = {

    //========= Images ================= 
    uploadImage(data) {
        return axios.post(apiConstants.imgUrl, data, { withCredentials: true })
    },

    getImages(pageNumber, size) {
        return axios.get(apiConstants.imgUrl, {
            params: {
                pageNumber: pageNumber,
                size: size,
            },
        }, { withCredentials: true })
    },

    deleteImage(name) {
        return axios.delete(apiConstants.imgUrl, {
            data: {
                name: name
            }
        })
    },

    //========== Audio ====================
    uploadAudio(data) {
        return axios.post(apiConstants.audioUrl, data, { withCredentials: true })
    },

    getAudios(data) {
        return axios.get(apiConstants.audioUrl, data, { withCredentials: true })
    },

    deleteAudio(name) {
        return axios.delete(apiConstants.audioUrl, {
            data: {
                name: name
            }
        })
    },

    //========== Text ====================
    uploadText(data) {
        return axios.post(apiConstants.textUrl, data, { withCredentials: true })
    },

    getTexts(data) {
        return axios.get(apiConstants.textUrl, data, { withCredentials: true })
    },

    deleteText(name) {
        return axios.delete(apiConstants.textUrl, {
            data: {
                name: name
            }
        })
    },

    //========== USERS =================
    loginUser(user) {
        return axios.post(apiConstants.userLoginUrl, user)
    },
    logoutUser(email) {
        return axios.post(apiConstants.userLogoutUrl, email);
    },
    registerUser(user) {
        return axios.post(apiConstants.userRegisterUrl, user)
    }
}