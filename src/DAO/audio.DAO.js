import axios from 'axios';
import {apiConfigs} from '../config/apiConfigs';

export const audioAPI = {
    uploadAudio(data) {
        return axios.post(apiConfigs.audioUrl, data, { withCredentials: true })
    },

    updateAudio(data) {
        return axios.put(apiConfigs.audioUrl, data, { withCredentials: true })
    },

    deleteAudio(originalName) {
        return axios.delete(apiConfigs.audioUrl, {
            withCredentials: true,
            params: {
                originalName: originalName
            }
        });
    },

    getAudios(pageNumber, size) {
        return axios.get(apiConfigs.audioUrl, {
            withCredentials: true, params: {
                pageNumber: pageNumber,
                size: size
            }
        })
    },
}