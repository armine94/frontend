import React, { Component } from 'react';
import axios from 'axios';
//import querystring from 'query-string'
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
class Upload extends Component {
  constructor(props) {
    super(props);
      this.state = {
        description: "",
        selectedFile: null,
        loaded:0,
        ext: '',
        choose: false,
      }
   
  }
 /* checkMimeType=(event)=>{
    //getting file object
    let files = event.target.files 
    //define message container
    let err = []
    // list allow mime type
   const types = ['image/png', 'image/jpeg', 'image/gif']
    // loop access array
    for(var x = 0; x<files.length; x++) {
     // compare file type find doesn't matach
         if (types.every(type => files[x].type !== type)) {
         // create error message and assign to container   
         err[x] = files[x].type+' is not a supported format\n';
       }
     };
     for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
         // discard selected file
        toast.error(err[z])
        event.target.value = null
    }
   return true;
  }*/
  maxSelectFile=(event)=>{
    let files = event.target.files
        if (files.length > 1) { 
           const msg = 'Only 1 images can be uploaded at a time'
           event.target.value = null
           toast.warn(msg)
           return false;
      }
    return true;
 }
 checkFileSize=(event)=>{
  let files = event.target.files
  let size = 250000000 
  let err = []; 
  for(var x = 0; x<files.length; x++) {
  if (files[x].size > size) {
   err[x] = files[x].type+'is too large, please pick a smaller file\n';
 }
};
for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
  // discard selected file
 toast.error(err[z])
 event.target.value = null
}
return true;
}

onExtetionHandler = event => {
  this.setState({
    choose: true, 
   })
  if(event.target.value === "image") {
    this.setState({
     ext: ".jpg, .png, .gif" 
    })
  } else if(event.target.value === "text") {
    this.setState({
     ext: ".pdf, .css, .html, .txt, .odt" 
    })
  }
  else if(event.target.value === "audio") {
    this.setState({
     ext: ".m4a" 
    })
  }
}

onDescriptionHendler = event => {
  this.setState({
    description: event.target.value
  })
}

onChangeHandler=event=>{
  var files = event.target.files;
  if(this.maxSelectFile(event) &&    this.checkFileSize(event)){ //&& this.checkMimeType(event) 
  // if return true allow to setState
     this.setState({
     selectedFile: files,
     loaded:0,
     
  }) 
	}
}
  onClickHandler = () => {
    const data = new FormData() 
    for(var x = 0; x<this.state.selectedFile.length; x++) {
      data.append('file', this.state.selectedFile[x]);
    }
    this.state.selectedFile.description = this.state.description;

    axios.post("/upload", data, {
	
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
        });
      },
    })
      .then(res => { // then print response status
        toast.success('upload success')
      })
      .catch(err => { // then print response status
        toast.error('upload fail')
      })
    }

  render() {
    return (
      <div className="container">
	      <div className="row">
      	  <div className="offset-md-3 col-md-6">
            <div className="form-group files">
              <label>Upload Your File </label>
              <input type="file" className="form-control" disabled={!this.state.choose} accept={this.state.ext}  multiple onChange={this.onChangeHandler}/>
            </div>  
            <div>
              <input type="radio" name="gender" onClick={this.onExtetionHandler} value="image"/> Image<br/>
              <input type="radio" name="gender" onClick={this.onExtetionHandler} value="text"/> Text<br/>
              <input type="radio" name="gender" onClick={this.onExtetionHandler} value="audio"/> Audio<br/>
            </div>
            <div className="form-group">
              <ToastContainer />
              <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
            </div> 
            <div >
              <input placeholder = "Enter your description" onChange={this.onDescriptionHendler} ></input><br/><div><p></p></div>
            </div>
              
            <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
	        </div>
        </div>
      </div>
    );
  }
}

export default Upload;
