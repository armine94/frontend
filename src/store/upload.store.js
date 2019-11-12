import { extendObservable, action } from 'mobx';
import { imageAPI } from '../DAO/image.DAO';
import { audioAPI } from '../DAO/audio.DAO';
import { videoAPI } from '../DAO/video.DAO';
import { textAPI } from '../DAO/text.DAO';


let instance = null

class UploadStore {
    static initialState = {
        status: '',
        uploadLoading: false
    }
    constructor() {
        extendObservable(this, {
            status: '',
            uploadLoading: false,
            loaded: 0,
            username: '',
            err: false
        });
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    @action
    uploadFile = (type, data, cb) => {
        this.uploadLoading = true;
        this.loaded = 0;
        switch (type) {
            case "image":
                imageAPI.uploadImage(data)
                    .then((res) => {
                        this.loaded = 100;
                        this.status = res.status;
                        this.uploadLoading = false;
                    })
                    .catch((err) => {
                        this.err = true;
                        cb && cb()
                    })
                break;
            case "audio":
                audioAPI.uploadAudio(data)
                    .then((res) => {
                        this.loaded = 100;
                        this.status = res.status;
                        this.uploadLoading = false;
                    })
                    .catch((err) => {
                        this.err = true;
                        cb && cb()
                    })
                break;
            case "video":
                videoAPI.uploadVideo(data)
                    .then((res) => {
                        this.loaded = 100;
                        this.status = res.status;
                        this.uploadLoading = false;
                    })
                    .catch((err) => {
                        this.err = true;
                        cb && cb()
                    })
                break;
            case "doc":
                textAPI.uploadText(data)
                    .then((res) => {
                        this.loaded = 100;
                        this.status = res.status;
                        this.uploadLoading = false;
                    })
                    .catch((err) => {
                        this.err = true;
                        cb && cb()
                    })
                break;
            default:
                break;
        }


    }
}

export { UploadStore };