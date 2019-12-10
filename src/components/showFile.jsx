import PDFViewer from 'pdf-viewer-reactjs';
import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import '../css/show.css';

class ShowFile extends Component {
    static propTypes = {
        show: PropTypes.any,
        docUrl: PropTypes.any,
        audioUrl: PropTypes.any,
        imageUrl: PropTypes.any,
        fileType: PropTypes.any,
        description: PropTypes.any,
        videoUrl: PropTypes.any,
        onClose: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.onClose.bind(this);
    }

    onClose = (e) => {
        this.props.onClose(e);
    }

    draw = () => {
        if (this.props.fileType === 'video') {
            return (
                <ReactPlayer
                    className="react-player video__player" url={this.props.videoUrl} playing={false} controls={true} />
            );
        } else if (this.props.fileType === 'audio') {
            return (
                <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 col-12 show-img-box">
                    <div className=" mt-6">
                        <img alt="img" className="audio__image" src={this.props.imageUrl} />
                        <ReactPlayer className="react-player audio__player" url={this.props.audioUrl} playing={false} controls={true} />
                    </div>
                </div>
            );
        } else if (this.props.fileType === 'image') {
            return (
                <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2 col-12 show-img-box">
                    <img alt="img" className="show-img-box-img" src={this.props.imageUrl} />
                </div>
            );
        } else if (this.props.fileType === 'pdf') {
            return (
                <div className="pdf">
                    <PDFViewer navbarOnTop={true} document={{ url: this.props.docUrl }} />
                </div>
            );
        }
    }

    render() {
        if (this.props.show) {
            return null;
        }
        return (
            <div className="player-wrapper ">
                <i className="fas fa-times player__close" value="close" onClick={this.onClose}></i>
                {this.draw()}
            </div>
        );
    }
}

export { ShowFile };