import React, { Component } from 'react';
import {HOST} from '../config';
import {observer} from 'mobx-react';
import { UploadStore } from '../store/Upload.DAO';

@observer 
class Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
            selectedFile: null,                                                                                                                       
            loaded:0,
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
                alert(msg);
                return false;
            }
        return true;
    }

    checkFileSize=(event)=>{
        let files = event.target.files
        let size = 250000000 
        let err = []; 
        for(let x = 0; x<files.length; x++) {
            if (files[x].size > size) {
                err[x] = files[x].type+'is too large, please pick a smaller file\n';
            }
        };
        for(let z = 0; z<err.length; z++) {// if message not same old that mean has error 
            event.target.value = null
        }
        return true;
    }

    onExtetionHandler = event => {
        this.setState({
            loaded: 0,
        })
        let object = this.refs.ChouseFile;
        let object1 = this.refs.Destination;
        object.value = "";
        object1.value = "";
        
        this.setState({
            choose: true, 
        })
        if(event.target.value === "image") {
            this.setState({
            ext: ".jpg, .png, .gif" ,
            type: "image"
            })
        } else if(event.target.value === "text") {
            this.setState({
            ext: ".pdf, .css, .html, .txt, .odt" ,
            type: "text"
            })
        }
        else if(event.target.value === "audio") {
            this.setState({
            ext: ".m4a",
            type: "audio"
            })
        }
    }

    onDescriptionHendler = event => {
        this.setState({
            description: event.target.value
        })
    }

    onChangeHandler = event => {
        this.setState({
            loaded:0,
        })
        let files = event.target.files;
        if(this.maxSelectFile(event) &&    this.checkFileSize(event)){ //&& this.checkMimeType(event) 
            this.setState({
                selectedFile: files,
                loaded:0,
                isSelected:true,
            }) 
        }
    }

    onClickHandler = () => {
        const data = new FormData() 
        data.append('file', this.state.selectedFile[0]);
        data.append("description", this.state.description);
        data.append("type", this.state.type);
        this.uploadStore.uploadImage(data);
        this.setState({
            loaded: 100,
            isSelected: false
        })
    }

    render() {
        const { uploadLoading } = this.uploadStore;

        return (
            <div className="container">
                <div> <h1>{ this.props.name}</h1></div>
                <div className="row">
                    <div className="offset-md-3 col-md-6">
                        <div className="form-group files">
                            <label>Upload Your File </label>
                            <input 
                            ref="ChouseFile" 
                            type="file" 
                            className="form-control" 
                            disabled={!this.state.choose}
                            accept={this.state.ext}  
                            multiple 
                            onChange={this.onChangeHandler}/>
                        </div>  
                        <div>
                            <input type="radio" name="radio" onClick={this.onExtetionHandler} value="image"/> Image<br/>
                            <input type="radio" name="radio" onClick={this.onExtetionHandler} value="text"/> Text<br/>
                            <input type="radio" name="radio" onClick={this.onExtetionHandler} value="audio"/> Audio<br/>
                        </div>
                        <div className="form-group">
                            {this.state.loaded} %
                        </div> 
                        <div >
                            <input ref="Destination" placeholder = "Enter your description" onChange={this.onDescriptionHendler} ></input><br/><div><p></p></div>
                        </div>
                        <button type="button" className="btn btn-success btn-block" disabled={!this.state.isSelected} onClick={this.onClickHandler}>Upload</button>
                    </div>
                </div>
                <h1>{uploadLoading}</h1>
            </div>
        );
    }
}

export  {Upload};
