import { extendObservable, action } from 'mobx';
import { pdfAPI } from '../DAO/pdf.DAO';

let instance = null;
class PDFStore {
    initialState = {
        currentPage: 1,
        originalName: '',
        status: '',
        metadata: '',
        description: '',
        imageUrl: '',
        deleted: false,
        docUrl: '',
        name: '',
        author: '',
        size: 5,
        zero: 0,
        disabled: false,
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
    getPdfs = (pageNumber, size, cb) => {
        if (pageNumber >= this.zero && size > this.zero) {
            this.currentPage = pageNumber;
            pdfAPI.getPdfs(pageNumber, size)
            .then((result) => {
                if (result.data.name.length < this.size) {
                    this.disabled = true;
                } else {
                    this.disabled = false;
                }
                this.deleted = false;
                this.status = result.status;
                this.name = result.data.name;
                this.author = result.data.author;
                this.docUrl = result.data.docUrl;
                this.imageUrl = result.data.imageUrl;
                this.metadata = result.data.metadatas;
                this.originalName = result.data.originalName;
                this.description = result.data.description;
                this.count = Math.ceil(result.data.count/size);
            })
            .catch(() => {
                sessionStorage.removeItem('email');
                cb();
            });
        }
    };

    @action
    updatePdf = (index, originalName, description, cb) => {
        if(originalName && index >= this.zero && this.author[index] === sessionStorage.getItem('email')){
            this.description[index] = description;
            const data = {
                newdescription: description,
                originalName: originalName,
                author: this.author[index]
            };
            pdfAPI.updatePdf(data)
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

    deletePdf = (index, originalName, pageNumber, size, cb) => {
        if(originalName && index >= this.zero && pageNumber >= this.zero && size > this.zero && this.author[index] === sessionStorage.getItem('email')){
            pdfAPI.deletePdf(originalName, this.author[index])
            .then((result) => {
                if (!result.error) {
                    this.getPdfs(pageNumber,size, cb);
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

export { PDFStore };