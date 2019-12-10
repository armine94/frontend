import axios from 'axios';
import {apiConfigs} from '../config/apiConfigs';

export const videoAPI = {
    
    uploadVideo(data) {
        return axios.post(apiConfigs.videoUrl, data, { withCredentials: true });
    },

    updateVideo(data) {
        return axios.put(apiConfigs.videoUrl, data, { withCredentials: true });
    },

    deleteVideo(originalName, author) {
        return axios.delete(apiConfigs.videoUrl, {
            withCredentials: true,
            params: {
                originalName: originalName,
                author: author
            }
        });
    },

    getVideos(pageNumber, size) {
        return axios.get(apiConfigs.videoUrl, {
            withCredentials: true,
            params: {
                pageNumber: pageNumber,
                size: size
            }
        });
    }
};