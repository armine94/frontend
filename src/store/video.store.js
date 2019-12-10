import { extendObservable, action } from 'mobx';
import { videoAPI } from '../DAO/video.DAO';


let instance = null;

class VideoStore {
    initialState = {
        currentPage: 1,
        originalName: '',
        status: '',
        metadata: '',
        description: '',
        imageUrl: '',
        videoUrl: '',
        name: '',
        zero: 0,
        size: 5,
        author: '',
        disabled: false,
        deleted: false,
        count: 0
    }
    
    constructor() {
        extendObservable(this, this.initialState);
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    @action
    getVideos = (pageNumber, size, cb) => {
        if (pageNumber >= this.zero && size > this.zero) {
            this.currentPage = pageNumber;
            videoAPI.getVideos(pageNumber, size)
            .then((result) => {
                if (result.data.name.length < this.size) {
                    this.disabled = true;
                    this.description = result.data.description;
                } else {
                    this.disabled = false;
                }
                this.deleted = false;
                this.status = result.status;
                this.name = result.data.name;
                this.author = result.data.author;
                this.imageUrl = result.data.imageUrl;
                this.videoUrl = result.data.videoUrl;
                this.metadata = result.data.metadatas;
                this.originalName = result.data.originalName;
                this.description = result.data.description;
                this.count = Math.ceil(result.data.count/size);
            })
            .catch(() => {
                sessionStorage.removeItem('email');
                cb();
            });
        }
    };

    @action
    updateVideo = (index, originalName, description, cb) => {
        if(originalName && index >= this.zero && this.author[index] === sessionStorage.getItem('email')){
            this.description[index] = description;
            const data = {
                author: this.author[index],
                originalName: originalName,
                newdescription: description
            };
            videoAPI.updateVideo(data)
            .then((result) => {
                if (!result.error) {
                    this.status = result.status;
                    this.deleted = false;
                }
            })
            .catch(() => {
                sessionStorage.removeItem('email');
                cb();
            });
        }
    };

    @action
    deleteVideo = (index, originalName, pageNumber, size, cb) => {
        if(originalName && index >= this.zero && pageNumber >= this.zero && size > this.zero && this.author[index] === sessionStorage.getItem('email')){
            videoAPI.deleteVideo(originalName, this.author[index])
            .then((result) => {
                if (!result.error) {
                    this.getVideos(pageNumber,size, cb);
                    this.status = result.status;
                    this.deleted = true;
                }
            })
            .catch(() => {
                sessionStorage.removeItem('email');
                cb();
            });
        }
    }
}

export { VideoStore };