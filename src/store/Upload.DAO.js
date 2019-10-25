import {extendObservable, action} from 'mobx';
import { APIClient } from '../APIClient/APIClient';

class UploadStore {
    static initialState = {
        status: '',
        uploadLoading: false
    }
    constructor () {
        extendObservable(this, {
            status: '',
            uploadLoading: false,
            loaded: 0,
        });
    }

    @action
    uploadImage = (image) => {
        this.uploadLoading = true;
        this.loaded = 0;
        APIClient.uploadImage(image)
            .then((res) => {
                this.loaded = 100;
                this.status = res.status;
                this.uploadLoading = false;
            })
            .catch((err) => err);
    }
}

export { UploadStore };