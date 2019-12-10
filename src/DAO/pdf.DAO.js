import axios from 'axios';
import { apiConfigs } from '../config/apiConfigs';

export const pdfAPI = {
    uploadPdf(data) {
        return axios.post(apiConfigs.pdfUrl, data, { withCredentials: true });
    },

    updatePdf(data) {
        return axios.put(apiConfigs.pdfUrl, data, { withCredentials: true });
    },

    getPdfs(pageNumber, size) {
        return axios.get(apiConfigs.pdfUrl, {
            withCredentials: true, params: {
                pageNumber: pageNumber,
                size: size
            }
        });
    },

    deletePdf(originalName, author) {
        return axios.delete(apiConfigs.pdfUrl, {
            withCredentials: true,
            params: {
                originalName: originalName,
                author: author
            }
        });
    }
};