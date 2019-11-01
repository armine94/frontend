import { extendObservable, action } from 'mobx';
import { APIClient } from '../APIClient/APIClient';

class ImageStore {
    constructor () {
        extendObservable(this, {
            status: '',
            metadata: '',
            description: '',
            path: '',
            name: '',
            err: false
        });
    }

    @action
    getImages = (pageNumber, size) => {
        APIClient.getImages(pageNumber, size)
            .then((res) => {
                if(res.data.name.length < 5){
                    this.err = true;
                    this.status = res.status;
                    this.description = res.data.description
                    this.name = res.data.name;
                    this.path = res.data.path;
                    this.metadata = res.data.metadatas;
                } else {
                    this.err = false;
                    this.status = res.status;
                    this.description = res.data.description
                    this.name = res.data.name;
                    this.path = res.data.path;
                    this.metadata = res.data.metadatas;
                }
            })
            .catch((err) => this.err = true);
    }

    deleteImage = (name) => {
        APIClient.deleteImage(name)
            .then((res) => {
                alert("jnjvec")
            })
            .catch((err) => alert(err))
    }
}

export {ImageStore}