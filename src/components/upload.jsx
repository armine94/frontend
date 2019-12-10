import { UploadStore } from '../store/upload.store';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { Navbar } from './navbar';
import '../css/upload.css';

@observer
class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 1,
            progress: 0,
            selectedFile: null,
            isSelected: false,
            description: '',
            isActive: false,
            loaded: 'load__0',
            size: 2500000000,
            index: 0,
            type: '',
            ext: ''
        };
        this.uploadStore = new UploadStore();
    }

    maxSelectFile = (event) => {
        let files = event.target.files;
        if (files.length > this.state.count) {
            event.target.value = null;
            return false;
        }
        return true;
    }

    checkFileSize = (event) => {
        const files = event.target.files;
        if (files[this.state.index].size > this.state.size) {
            event.target.value = null;
        }
        return true;
    }

    onExtetionHandler = event => {
        this.setState({
            loaded: 'load__0',
            progress: 0,
            isActive: true
        });

        switch (event.target.value) {
            case 'image':
                this.setState({
                    ext: '.jpg, .png, .gif',
                    type: 'image'
                });
                break;
            case 'video':
                this.setState({
                    ext: '.mp4',
                    type: 'video'
                });
                break;
            case 'audio':
                this.setState({
                    ext: '.m4a',
                    type: 'audio'
                });
                break;

            case 'pdf':
                this.setState({
                    ext: '.pdf',
                    type: 'pdf'
                });
                break;
            default:
                break;
        }
    }

    onDescriptionHendler = event => {
        this.setState({
            description: event.target.value
        });
    }

    onChangeHandler = event => {
        this.setState({
            loaded: 'load__0',
            progress: 0
        });
        const files = event.target.files;
        if (this.maxSelectFile(event) && this.checkFileSize(event)) {
            this.setState({
                selectedFile: files,
                isSelected: true,
                loaded: 'load__0',
                progress: 0
            });
        }
    }

    onClickHandler = () => {
        const data = new FormData();
        data.append('file', this.state.selectedFile[this.state.index]);
        data.append('description', this.state.description);
        data.append('author', sessionStorage.getItem('email'));
        this.uploadStore.uploadFile(this.state.type, data, () => { window.location.href = '/'; }, () => {
            this.setState({
                loaded: 'load__100',
                progress: 100,
                isSelected: false
            });
        });
    }

    render() {
        return (
            <>
                <Navbar />
                <div className="container">
                    <div className="col-lg-5 offset-lg-3 col-sm-7 offset-sm-2 col-7 offset-1">
                        <div className="card mt-6">
                            <div className="card-body p-4">
                                <div>
                                    {this.state.isActive ?
                                        <input
                                            className="choose__input"
                                            type="file"
                                            accept={this.state.ext}
                                            multiple
                                            onChange={this.onChangeHandler}
                                        /> : <h5>Choose uploading file type</h5>}
                                </div>

                                <div className="upload__radio">
                                    <input type="radio" name="radio" onClick={this.onExtetionHandler} value="image" /> Image<br />
                                    <input type="radio" name="radio" onClick={this.onExtetionHandler} value="audio" /> Audio<br />
                                    <input type="radio" name="radio" onClick={this.onExtetionHandler} value="video" /> Video<br />
                                    <input type="radio" name="radio" onClick={this.onExtetionHandler} value="pdf" /> PDF<br />
                                </div>

                                <div >
                                    <label>Description</label>
                                    <input className="upload__description" placeholder="Enter your description" onChange={this.onDescriptionHendler} ></input><br /><div><p></p></div>
                                </div>

                                <div>
                                    <label>Load {this.state.progress} %</label>
                                </div>

                                <div className="load">
                                    <div className={this.state.loaded} ></div>
                                </div>

                                <button type="button" className="btn upload__button" disabled={!this.state.isSelected} onClick={this.onClickHandler}>Upload File</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

export { Upload };