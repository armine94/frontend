import { UploadStore } from '../store/upload.store';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import '../css/upload.css';

@observer
class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
            isSelected: false,
            description: '',
            isActive: false,
            loaded: 0,
            type: '',
            ext: '',
        }
        this.uploadStore = new UploadStore();
    }

    maxSelectFile = (event) => {
        let files = event.target.files
        if (files.length > 1) {
            event.target.value = null;
            return false;
        }
        return true;
    }

    checkFileSize = (event) => {
        const files = event.target.files;
        const size = 25000000;
        if (files[0].size > size) {
            event.target.value = null
        }
        return true;
    }

    onExtetionHandler = event => {
        this.setState({
            loaded: 0,
            isActive: true,
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
                    ext: ".m4a, .mp3",
                    type: "audio"
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
        if (this.maxSelectFile(event) && this.checkFileSize(event)) {
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
        this.uploadStore.uploadFile(this.state.type, data, () => window.location.href = '/');
        this.setState({
            loaded: 100,
            isSelected: false
        })
        const object = this.refs.chouseFile;
        const object1 = this.refs.description;
        object.value = "";
        object1.value = "";
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="offset-md-3 offset-sm-1 offset-1 col-md-6 col-sm-10 col-10">
                        <div className="form-group">
                            {this.state.isActive ?
                                <input
                                    className="choose__input"
                                    ref="chouseFile"
                                    type="file"
                                    accept={this.state.ext}
                                    multiple
                                    onChange={this.onChangeHandler}
                                /> : <h3 className="upload__header">Choose uploading file type</h3>}
                        </div>
                        <div className="upload__radio">
                            <input type="radio" name="radio" onClick={this.onExtetionHandler} value="image" /> Image<br />
                            <input type="radio" name="radio" onClick={this.onExtetionHandler} value="audio" /> Audio<br />
                        </div>
                        <div className="form-group upload__radio">
                            Load {this.state.loaded} %
                        </div>
                        <div>
                            <input className="upload__description" ref="description" placeholder="Enter your description" onChange={this.onDescriptionHendler} ></input><br /><div><p></p></div>
                        </div>
                        <button type="button" className="btn upload__button" disabled={!this.state.isSelected} onClick={this.onClickHandler}>Upload File</button>
                    </div>
                </div>
            </div>
        );
    }
}

export { Upload };