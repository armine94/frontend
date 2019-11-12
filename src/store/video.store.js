import { extendObservable, action } from 'mobx';
import { videoAPI } from '../DAO/video.DAO';


let instance = null

class VideoStore {
    constructor() {
        extendObservable(this, {
            originalName: '',
            status: '',
            metadata: '',
            description: '',
            path: '',
            name: '',
            err: false,
            disabled: false
        });
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    @action
    getVideos = (pageNumber, size) => {
        if (pageNumber > 0 && size > 0) {
            videoAPI.getVideos(pageNumber, size)
                .then((result) => {
                    if (result.data.name.length < 5) {
                        this.disabled = true;
                        this.err = true;
                        this.status = result.status;
                        this.name = result.data.name;
                        this.path = result.data.path;
                        this.metadata = result.data.metadatas;
                        this.originalName = result.data.originalName;
                        this.description = result.data.description;
                    } else {
                        this.err = false;
                        this.disabled = false;
                        this.status = result.status;
                        this.name = result.data.name;
                        this.path = result.data.path;
                        this.metadata = result.data.metadatas;
                        this.originalName = result.data.originalName;
                        this.description = result.data.description
                    }
                })
                .catch((err) => this.err = true);
        }

    };

    @action
    updateVideo = (index, originalName, name, description) => {
        if(originalName && name && index > -1){
            this.name[index] = name;
            this.description[index] = description;
            const data = {
                originalName: originalName,
                newName: name,
                newdescription: description,
            }
            videoAPI.updateVideo(data)
                .then((result) => {
                    if (result.status === 200) {
                        this.status = result.status;
                    } else {
                        this.err = true;
                    }
                })
                .catch((err) => this.err = true);
        }
    };

    @action
    deleteVideo = (index, originalName, pageNumber, size) => {
        if(originalName && index > -1 && pageNumber > 0 && size > 0){
            this.name.splice(index, 1);
            this.path.splice(index, 1);
            this.metadata.splice(index, 1);
            videoAPI.deleteVideo(originalName, pageNumber, size)
                .then((result) => {
                    if (result.status === 200) {
                        this.getImages(pageNumber,size);
                        this.status = result.status;
                    } else {
                        this.err = true;
                    }
                })
                .catch((err) => this.err = true);
        }
    }
}


export { VideoStore }