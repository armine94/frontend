import axios from 'axios';
import { apiConfigs } from '../config/apiConfigs'

export const imageAPI = {
    uploadImage(data) {
        return axios.post(apiConfigs.imgUrl, data, { withCredentials: true })
    },

    updateImage(data) {
        return axios.put(apiConfigs.imgUrl, data, { withCredentials: true })
    },

    deleteImage(originalName) {
        return axios.delete(apiConfigs.imgUrl, {
            withCredentials: true,
            params: {
                originalName: originalName
            }
        });
    },

    getImages(pageNumber, size) {
        return axios.get(apiConfigs.imgUrl, {
            withCredentials: true, params: {
                pageNumber: pageNumber,
                size: size
            }
        })
    },
}
