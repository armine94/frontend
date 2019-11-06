
import axios from 'axios';
import { apiConfigs } from './apiConfigs'

export const textAPI = {
    uploadText(data) {
        return axios.post(apiConfigs.textUrl, data, { withCredentials: true })
    },

    getTexts(pageNumber, size) {
        return axios.get(apiConfigs.textUrl, {
            withCredentials: true, params: {
                pageNumber: pageNumber,
                size: size
            }
        })
    },

    deleteText(name) {
        return axios.delete(apiConfigs.textUrl, {
            data: {
                name: name
            }
        })
    },
}
