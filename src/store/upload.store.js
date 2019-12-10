import { extendObservable, action } from 'mobx';
import { imageAPI } from '../DAO/image.DAO';
import { audioAPI } from '../DAO/audio.DAO';
import { videoAPI } from '../DAO/video.DAO';
import { pdfAPI } from '../DAO/pdf.DAO';

let instance = null;
class UploadStore {
    static initialState = {
        status: '',
        uploadLoading: false,
        loaded: 0,
        username: '',
        err: false
    }
    constructor() {
        extendObservable(this, this.initialState);
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    @action
    uploadFile = (type, data, cb, cb2) => {
        this.uploadLoading = true;
        this.loaded = 0;
        switch (type) {
            case 'image':
                imageAPI.uploadImage(data)
                .then((res) => {
                    this.status = res.status;
                    cb2();
                })
                .catch((err) => {
                    this.err = err;
                    sessionStorage.removeItem('email');
                    cb();
                });
                break;
            case 'audio':
                audioAPI.uploadAudio(data)
                .then((res) => {
                    this.status = res.status;
                    cb2();
                })
                .catch((err) => {
                    this.err = err;
                    sessionStorage.removeItem('email');
                    cb();
                });
                break;
            case 'video':
                videoAPI.uploadVideo(data)
                .then((res) => {
                    this.status = res.status;
                    cb2();
                })
                .catch((err) => {
                    this.err = err;
                    sessionStorage.removeItem('email');
                    cb();
                });
                break;
            case 'pdf':
                pdfAPI.uploadPdf(data)
                .then((res) => {
                    this.status = res.status;
                    cb2();
                })
                .catch((err) => {
                    this.err = err;
                    sessionStorage.removeItem('email');
                    cb();
                });
                break;
            default:
                break;
        }
    }
}

export { UploadStore };