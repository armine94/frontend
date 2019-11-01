import { extendObservable, action } from 'mobx';
import { APIClient } from '../APIClient/APIClient';

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
    uploadImage = (type, image, cb) => {
        this.uploadLoading = true;
        this.loaded = 0;
        switch (type) {
            case "image":
                APIClient.uploadImage(image)
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
                APIClient.uploadAudio(image)
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
            case "text":
                APIClient.uploadText(image)
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
        }


    }
}

export { UploadStore };