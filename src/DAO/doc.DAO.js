import axios from 'axios';
import { apiConfigs } from '../config/apiConfigs'

export const docAPI = {
    uploadDoc(data) {
        return axios.post(apiConfigs.docUrl, data, { withCredentials: true })
    },

    getDocs(pageNumber, size) {
        return axios.get(apiConfigs.docUrl, {
            withCredentials: true, params: {
                pageNumber: pageNumber,
                size: size
            }
        })
    },

    deleteDoc(name) {
        return axios.delete(apiConfigs.docUrl, {
            data: {
                name: name
            }
        })
    },
}