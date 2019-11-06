import axios from 'axios';
import {apiConfigs} from './apiConfigs'
export const audioAPI = {
    uploadAudio(data) {
        return axios.post(apiConfigs.audioUrl, data, { withCredentials: true })
    },

    getAudios(pageNumber, size) {
        return axios.get(apiConfigs.audioUrl, {
            withCredentials: true, params: {
                pageNumber: pageNumber,
                size: size
            }
        })
    },

    deleteAudio(name) {
        return axios.delete(apiConfigs.audioUrl, {
            data: {
                name: name
            }
        })
    },
}