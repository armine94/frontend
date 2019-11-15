import { extendObservable, action } from 'mobx';
import { docAPI } from '../DAO/doc.DAO';

let instance = null
class DocStore {
    constructor() {
        extendObservable(this, {
            originalName: '',
            status: '',
            metadata: '',
            description: '',
            imageUrl: '',
            docUrl: '',
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
    getDocs = (pageNumber, size) => {
        if (pageNumber > 0 && size > 0) {
            docAPI.getDocs(pageNumber, size)
            .then((result) => {
                if (result.data.name.length < 5) {
                    this.disabled = true;
                    this.err = true;
                    this.status = result.status;
                    this.name = result.data.name;
                    this.imageUrl = result.data.imageUrl;
                    this.docUrl = result.data.docUrl;
                    this.metadata = result.data.metadatas;
                    this.originalName = result.data.originalName;
                    this.description = result.data.description;
                } else {
                    this.err = false;
                    this.disabled = false;
                    this.status = result.status;
                    this.name = result.data.name;
                    this.imageUrl = result.data.imageUrl;
                    this.docUrl = result.data.docUrl;
                    this.metadata = result.data.metadatas;
                    this.originalName = result.data.originalName;
                    this.description = result.data.description
                }
            })
            .catch((err) => this.err = true);
        }
    };

    @action
    updateDoc = (index, originalName, name, description) => {
        if(originalName && name && index > -1){
            this.name[index] = name;
            this.description[index] = description;
            const data = {
                originalName: originalName,
                newName: name,
                newdescription: description,
            }
            docAPI.updateDoc(data)
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
    deleteDoc = (index, originalName, pageNumber, size) => {
        if(originalName && index > -1 && pageNumber > 0 && size > 0){
            this.metadata.splice(index, 1);
            docAPI.deleteDoc(originalName, pageNumber, size)
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

export { DocStore }