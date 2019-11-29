import { extendObservable, action } from 'mobx';
import { imageAPI } from '../DAO/image.DAO';

let instance = null;
class ImageStore {
    initialState = {
        originalName: '',
        status: '',
        author: '',
        metadata: '',
        description: '',
        imageUrl: '',
        name: '',
        err: false,
        disabled: false,
    }
    constructor() {
        extendObservable(this, this.initialState);
        if (!instance) {
            instance = this;
        }
        return instance;
    }

    @action
    getImages = (pageNumber, size, cb) => {
        if (pageNumber > 0 && size > 0) {
            imageAPI.getImages(pageNumber, size)
            .then((result) => {
                if(!result.data.error) {
                    if (result.data.name.length < 5) {
                        this.disabled = true;
                    } else {
                        this.disabled = false;
                    }
                    this.status = result.status;
                    this.name = result.data.name;
                    this.author = result.data.author;
                    this.imageUrl = result.data.imageUrl;
                    this.metadata = result.data.metadatas;
                    this.description = result.data.description;
                    this.originalName = result.data.originalName;
                }
            })
            .catch((err) => {
                sessionStorage.removeItem('email');
                cb && cb();
            });
        }
    };

    @action
    updateImage = (index, originalName, name, description, cb) => {
        if(originalName && name && index > -1){
            const data = {
                newdescription: description,
                originalName: originalName,
                newName: name,
            }
            imageAPI.updateImage(data)
            .then((result) => {
                if (!result.error) {
                    this.status = result.status;
                }
            })
            .catch((err) => {
                sessionStorage.removeItem('email');
                cb && cb();
            });
        }
    };

    @action
    deleteImage = (index, originalName, pageNumber, size, cb) => {
        if(originalName && index > -1 && pageNumber > 0 && size > 0){
            imageAPI.deleteImage(originalName, this.author[index])
            .then((result) => {
                if (!result.error) {
                    this.getImages(pageNumber, size, cb);
                    this.status = result.status;
                }
            })
            .catch((err) => {
                sessionStorage.removeItem('email');
                cb && cb();
            });
        }
    }
}

export { ImageStore };