import { extendObservable, action } from 'mobx';
import { audioAPI } from '../DAO/audio.DAO';

let instance = null;
class AudioStore {
    initialState = {
        currentPage: 1,
        originalName: '',
        status: '',
        metadata: '',
        description: '',
        imageUrl: '',
        audioUrl: '',
        name: '',
        author: '',
        disabled: false,
        deleted: false,
        zero: 0,
        size: 5,
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
    getAudios = (pageNumber, size, cb) => {
        if (pageNumber >= this.zero && size > this.zero) {
            this.currentPage = pageNumber;
            audioAPI.getAudios(pageNumber, size)
            .then((result) => {
                if(!result.data.error) {
                    if (result.data.name.length < this.size) {
                        this.disabled = true;
                    } else {
                        this.disabled = false;
                    }
                    this.deleted = false;
                    this.status = result.status;
                    this.name = result.data.name;
                    this.author = result.data.author;
                    this.imageUrl = result.data.imageUrl;
                    this.audioUrl = result.data.audioUrl;
                    this.metadata = result.data.metadatas;
                    this.description = result.data.description;
                    this.originalName = result.data.originalName;
                    this.count = Math.ceil(result.data.count/size);
                }
            })
            .catch(() => {
                sessionStorage.removeItem('email');
                cb();
            });
        }
    };

    @action
    updateAudio = (index, originalName, description, cb) => {
        if(originalName && index >= this.zero && this.author[index] === sessionStorage.getItem('email')){
            this.description[index] = description;
            const data = {
                author: this.author[index],
                originalName: originalName,
                newdescription: description
            };
            audioAPI.updateAudio(data)
            .then((result) => {
                if (!result.error) {
                    this.deleted = false;
                    this.status = result.status;
                }
            })
            .catch(() => {
                sessionStorage.removeItem('email');
                cb();
            });
        }
    };

    @action
    deleteAudio = (index, originalName, pageNumber, size, cb) => {
        if(originalName && index >= this.zero && pageNumber >= this.zero && size > this.zero && this.author[index] === sessionStorage.getItem('email')){
            audioAPI.deleteAudio(originalName, this.author[index])
            .then((result) => {
                if (!result.error) {
                    this.getAudios(pageNumber,size, cb);
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

export { AudioStore };