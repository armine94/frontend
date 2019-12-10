import { ImageStore } from '../store/image.store';
import { AudioStore } from '../store/audio.store';
import { VideoStore } from '../store/video.store';
import { PDFStore } from '../store/pdf.store';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/modal.css';

class Modal extends Component {
    static propTypes = {
        show: PropTypes.any,
        index: PropTypes.any,
        fileType: PropTypes.any,
        description: PropTypes.any,
        originalName: PropTypes.any,
        onClose: PropTypes.func
      };    
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            description: ''
        };
        this.onClose.bind(this);
        this.onChange.bind(this);
        this.onUpdate.bind(this);
        this.pdfStore = new PDFStore();
        this.imageStore = new ImageStore();
        this.audioStore = new AudioStore();
        this.videoStore = new VideoStore();
    }

    onClose = (e) => {
        if (e.target) {
            this.setState({
                description: ''
            });
        }
        this.props.onClose(e);
    }

    onChange = (item) => (e) => {
        if (item === 'description' && e.target.value === this.props.description) {
            this.setState({
                [item]: e.target.value
            });
        } else if (e.target) {
            this.setState({
                [item]: e.target.value
            });
        }
    }

    onUpdate = (e) => {
        switch (this.props.fileType) {
            case 'image':
                this.imageStore.updateImage(this.props.index, this.props.originalName, this.state.description || this.props.description, () => { window.location.href = '/'; });
                break;
            case 'audio':
                this.audioStore.updateAudio(this.props.index, this.props.originalName, this.state.description || this.props.description, () => { window.location.href = '/'; });
                break;
            case 'video':
                this.videoStore.updateVideo(this.props.index, this.props.originalName, this.state.description || this.props.description, () => { window.location.href = '/'; });
                break;
            case 'pdf':
                this.pdfStore.updatePdf(this.props.index, this.props.originalName, this.state.description || this.props.description, () => { window.location.href = '/'; });
                break;
            default:
                break;
        }
        this.onClose(e);
    }

    render() {
        if (this.props.show) {
            return null;
        }
        return (
            <div className="modal__bg">
                <div className="container">
                    <div className="col-lg-5 offset-lg-3 col-sm-8 offset-sm-2 col-12">
                        <div className="card mt-6">
                            <div className="card-body p-4">
                                <h5 className="text-center">Edit Description</h5>
                                <div>
                                    <div className="form-group mb-3">
                                        <label>Description</label>
                                        <input className="form-control" placeholder="description" onChange={this.onChange('description')} value={this.state.description || this.props.description} />
                                    </div>

                                    <div className="form-group mb-0 text-center edit">
                                        <button className="btn btn-primary button" onClick={this.onUpdate} value="save"> Save </button>
                                        <button className="btn button btn__cancel" onClick={this.onClose} value="cancel"> Cancel </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export { Modal };