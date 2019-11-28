import { extendObservable, action } from 'mobx';
import { imageAPI } from '../DAO/image.DAO';
import { audioAPI } from '../DAO/audio.DAO';

let instance = null;
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
    uploadFile = (type, data, cb, cb2) => {
        this.uploadLoading = true;
        this.loaded = 0;
        switch (type) {
            case "image":
                imageAPI.uploadImage(data)
                .then((res) => {
                    if(res.error) {
                        this.err = true;
                        sessionStorage.removeItem('email');
                        cb2 && cb2();
                    } else {
                        this.loaded = 100;
                        // this.status = res.status;
                        // this.uploadLoading = false;
                        // cb && cb();
                    }       
                })
                .catch((err) => {
                    this.err = true;
                    sessionStorage.removeItem('email');
                    console.log(cb2);
                    
                    cb2 && cb2();
                })
                break;
            case "audio":
                audioAPI.uploadAudio(data)
                .then((res) => {
                    if(res.error) {
                        this.err = true;
                        sessionStorage.removeItem('email');
                        cb2 && cb2();
                    } else {
                        this.loaded = 100;
                        this.status = res.status;
                        this.uploadLoading = false;
                        cb && cb();
                    }       
                })
                .catch((err) => {
                    this.err = true;
                    sessionStorage.removeItem('email');
                    cb2 && cb2();
                })
                break;
            default:
                break;
        }
    }
}

export { UploadStore };