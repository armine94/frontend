import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { UploadStore } from '../store/upload.store';
import '../css/upload.css';

@observer
class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            selectedFile: null,
            loaded: 0,
            ext: '',
            choose: false,
            isSelected: false,
            type: '',
            source: null,
        }
        this.uploadStore = new UploadStore();
    }

    maxSelectFile = (event) => {
        let files = event.target.files
        if (files.length > 1) {
            const msg = 'Only 1 images can be uploaded at a time';
            event.target.value = null;
            return false;
        }
        return true;
    }

    checkFileSize = (event) => {
        let files = event.target.files
        let size = 250000000
        let err = [];
        for (let x = 0; x < files.length; x++) {
            if (files[x].size > size) {
                err[x] = files[x].type + 'is too large, please pick a smaller file\n';
            }
        };
        for (let z = 0; z < err.length; z++) {// if message not same old that mean has error 
            event.target.value = null
        }
        return true;
    }

    onExtetionHandler = event => {
        this.setState({
            loaded: 0,
        })
        let object = this.refs.chouseFile;
        let object1 = this.refs.description;
        object.value = "";
        object1.value = "";

        this.setState({
            choose: true,
        })
        switch (event.target.value) {
            case "image":
                this.setState({
                    ext: ".jpg, .png, .gif",
                    type: "image"
                })
                break;
            case "video":
                this.setState({
                    ext: ".mp4",
                    type: "video"
                })
                break;
            case 'audio':
                this.setState({
                    ext: ".m4a",
                    type: "audio"
                })
                break;

            case 'doc':
                this.setState({
                    ext: ".pdf, .css, .html, .txt, .odt",
                    type: "doc"
                })
                break;

            default:
                break;
        }
    }

    onDescriptionHendler = event => {
        this.setState({
            description: event.target.value
        })
    }

    onChangeHandler = event => {
        this.setState({
            loaded: 0,
        })
        const files = event.target.files;
        if (this.maxSelectFile(event) && this.checkFileSize(event)) { //&& this.checkMimeType(event) 
            this.setState({
                selectedFile: files,
                loaded: 0,
                isSelected: true,
            })
        }
    }

    onClickHandler = () => {
        const data = new FormData()
        data.append('file', this.state.selectedFile[0]);
        data.append("description", this.state.description);
        this.uploadStore.uploadFile(this.state.type, data, () => this.props.history.push('/login'));
        this.setState({
            loaded: 100,
            isSelected: false
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-md-3 col-md-6 cok-sm-8">
                        <div className="form-group files">
                            <label className="upload__label">Upload Your File </label>
                            <input
                                ref="chouseFile"
                                type="file"
                                className="form-control"
                                disabled={!this.state.choose}
                                accept={this.state.ext}
                                multiple
                                onChange={this.onChangeHandler} />
                        </div>
                        <div className="upload__radio">
                            <input type="radio" name="radio" onClick={this.onExtetionHandler} value="image" /> Image<br />
                            <input type="radio" name="radio" onClick={this.onExtetionHandler} value="audio" /> Audio<br />
                            <input type="radio" name="radio" onClick={this.onExtetionHandler} value="video" /> Video<br />
                            <input type="radio" name="radio" onClick={this.onExtetionHandler} value="doc" /> Document<br />
                        </div>
                        <div className="form-group upload__radio">
                            {this.state.loaded} %
                        </div>
                        <div >
                            <input className="upload__input" ref="description" placeholder="Enter your description" onChange={this.onDescriptionHendler} ></input><br /><div><p></p></div>
                        </div>
                        <button type="button" className="btn  btn-block  upload__button" disabled={!this.state.isSelected} onClick={this.onClickHandler}>Upload File</button>
                    </div>
                </div>
            </div>
        );
    }
}

export { Upload };