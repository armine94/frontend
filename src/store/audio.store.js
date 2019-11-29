import { extendObservable, action } from 'mobx';
import { audioAPI } from '../DAO/audio.DAO';

let instance = null
class AudioStore {
    initialState = {
        originalName: '',
        status: '',
        metadata: '',
        description: '',
        imageUrl: '',
        audioUrl: '',
        name: '',
        err: false,
        author: '',
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
    getAudios = (pageNumber, size, cb) => {
        if (pageNumber > 0 && size > 0) {
            audioAPI.getAudios(pageNumber, size)
            .then((result) => {
                if(!result.data.error) {
                    if (result.data.name.length < 5) {
                        this.disabled = true;
                    } else {
                        this.disabled = false;
                    }
                    this.status = result.status;
                    this.name = result.data.name;
                    this.imageUrl = result.data.imageUrl;
                    this.audioUrl = result.data.audioUrl;
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
    updateAudio = (index, originalName, name, description, cb) => {
        if(originalName && name && index > -1){
            this.name[index] = name;
            this.description[index] = description;
            const data = {
                newName: name,
                originalName: originalName,
                newdescription: description,
            }
            audioAPI.updateAudio(data)
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
    deleteAudio = (index, originalName, pageNumber, size, cb) => {
        if(originalName && index > -1 && pageNumber > 0){
            audioAPI.deleteAudio(originalName)
            .then((result) => {
                if (!result.error) {
                    this.getAudios(pageNumber,size, cb);
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

export { AudioStore };