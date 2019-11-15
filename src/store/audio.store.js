import { extendObservable, action } from 'mobx';
import { audioAPI } from '../DAO/audio.DAO';

let instance = null
class AudioStore {
    constructor() {
        extendObservable(this, {
            originalName: '',
            status: '',
            metadata: '',
            description: '',
            imageUrl: '',
            audioUrl: '',
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
    getAudios = (pageNumber, size) => {
        if (pageNumber > 0 && size > 0) {
            audioAPI.getAudios(pageNumber, size)
            .then((result) => {
                if (result.data.name.length < 5) {
                    this.disabled = true;
                    this.err = true;
                    this.status = result.status;
                    this.name = result.data.name;
                    this.imageUrl = result.data.imageUrl;
                    this.audioUrl = result.data.audioUrl;
                    this.metadata = result.data.metadatas;
                    this.originalName = result.data.originalName;
                    this.description = result.data.description;
                } else {
                    this.err = false;
                    this.disabled = false;
                    this.status = result.status;
                    this.name = result.data.name;
                    this.imageUrl = result.data.imageUrl;
                    this.audioUrl = result.data.audioUrl;
                    this.metadata = result.data.metadatas;
                    this.originalName = result.data.originalName;
                    this.description = result.data.description
                }
            })
            .catch((err) => this.err = true);
        }
    };

    @action
    updateAudio = (index, originalName, name, description) => {
        if(originalName && name && index > -1){
            this.name[index] = name;
            this.description[index] = description;
            const data = {
                originalName: originalName,
                newName: name,
                newdescription: description,
            }
            audioAPI.updateAudio(data)
            .then((result) => {
                if (result.status === 200) {
                    this.status = result.status;
                } else {
                    this.err = true;
                }
            })
            .catch((err) => this.err = true);
        }
    };

    @action
    deleteAudio = (index, originalName, pageNumber, size) => {
        if(originalName && index > -1 && pageNumber > 0 && size > 0){
            this.metadata.splice(index, 1);
            audioAPI.deleteAudio(originalName, pageNumber, size)
            .then((result) => {
                if (result.status === 200) {
                    this.getImages(pageNumber,size);
                    this.status = result.status;
                } else {
                    this.err = true;
                }
            })
            .catch((err) => this.err = true);
        }
    }
}

export { AudioStore }