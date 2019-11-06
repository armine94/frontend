import axios from 'axios';
import { apiConfigs } from './apiConfigs'

export const imageAPI = {
    uploadImage(data) {
        return axios.post(apiConfigs.imgUrl, data, { withCredentials: true })
    },

    getImages(pageNumber, size) {
        return axios.get(apiConfigs.imgUrl, {
            withCredentials: true, params: {
                pageNumber: pageNumber,
                size: size
            }
        })
    },

    deleteImage(name) {
        return axios.delete(apiConfigs.imgUrl, {
            data: {
                name: name
            }
        })
    },
}
