import React, { Component } from 'react';
import { PDFTable } from './pdfTable';
import { ImageTable } from './imageTable';
import { AudioTable } from './audioTable';
import { VideoTable } from './videoTable';
import { Navbar } from './navbar';

import '../css/table.css';

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileType: 'image'
        };
    }

    changeFileType = (name) => () => {
        this.setState({
            fileType: name
        });
    }

    show = () => {
        switch (this.state.fileType) {
            case 'image':
                return <ImageTable />;
            case 'pdf':
                return <PDFTable/>;
            case 'video':
                return <VideoTable/>;
            case 'audio':
                return <AudioTable />;
            default:
                return <ImageTable />;
        }
    }

    render() {
        return (
           <><Navbar/>
            <div className="container mt-3">
                <div className="row m-0">
                    <div>
                        <button className="btn btn-info filter__btn" onClick={this.changeFileType('image')}>Image</button>
                        <button className="btn btn-info filter__btn" onClick={this.changeFileType('video')}>Video</button>
                        <button className="btn btn-info filter__btn" onClick={this.changeFileType('audio')}>Audio</button>
                        <button className="btn btn-info filter__btn" onClick={this.changeFileType('pdf')}>PDF</button>
                    </div>
                </div>
                <div className="content mt-3">
                    {this.show()}
                </div>
            </div>
            </>
        );
    }
}

export { View };