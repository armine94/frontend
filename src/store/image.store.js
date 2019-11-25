import { extendObservable, action } from 'mobx';
import { imageAPI } from '../DAO/image.DAO';

let instance = null;
class ImageStore {
    constructor() {
        extendObservable(this, {
            originalName: '',
            status: '',
            metadata: '',
            description: '',
            imageUrl: '',
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
    getImages = (pageNumber, size, cb) => {
        if (pageNumber > 0 && size > 0) {
            imageAPI.getImages(pageNumber, size)
            .then((result) => {
                if (result.data.name.length < 5) {
                    this.disabled = true;
                } else {
                    this.disabled = false;
                }
                this.status = result.status;
                this.name = result.data.name;
                this.imageUrl = result.data.imageUrl;
                this.metadata = result.data.metadatas;
                this.originalName = result.data.originalName;
                this.description = result.data.description;
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
            this.name[index] = name;
            this.description[index] = description;
            const data = {
                originalName: originalName,
                newName: name,
                newdescription: description,
            }
            imageAPI.updateImage(data)
            .then((result) => {
                if (result.status === 200) {
                    this.status = result.status;
                } else {
                    sessionStorage.removeItem('email');
                    cb && cb();
                }
            })
            .catch((err) =>{
                sessionStorage.removeItem('email');
                cb && cb();
            });
        }
    };

    @action
    deleteImage = (index, originalName, pageNumber, size, cb) => {
        if(originalName && index > -1 && pageNumber > 0 && size > 0){
            imageAPI.deleteImage(originalName)
            .then((result) => {
                if (result.status === 200) {
                    this.getImages(pageNumber, size, cb);
                    this.status = result.status;
                } else {
                    sessionStorage.removeItem('email');
                    cb && cb();
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