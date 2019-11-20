import Modal from 'react-modal';
import React, { Component } from 'react';
import { ImageStore } from '../store/image.store';
import { AudioStore } from '../store/audio.store';

class MyModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            name: '',
            description: ''
        }
        this.onClose.bind(this);
        this.onChange.bind(this);
        this.onUpdate.bind(this);
        this.imageStore = new ImageStore();
        this.audioStore = new AudioStore();
    }

    onClose = (e) => {
        if (e.target) {
            this.setState({
                name: '',
                description: '',
            });
        }
        this.props.onClose && this.props.onClose(e);
    }

    onChange = (item) => (e) => {
        if (item === 'name' && e.target.value == this.props.name) {
            this.setState({
                [item]: e.props.name
            });
        } else if (item === 'description' && e.target.value == this.props.description) {
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
                this.imageStore.updateImage(this.props.index, this.props.originalName, this.state.name || this.props.name, this.state.description || this.props.description)
                break;
            case 'audio':
                this.audioStore.updateAudio(this.props.index, this.props.originalName, this.state.name || this.props.name, this.state.description || this.props.description)
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
            <Modal contentLabel="modalA" ariaHideApp={false} isOpen={true}  >
                <div className="container-fluid modal__bg">
                    <div className='modal__content'>
                        <div className="row modal__margin">
                            <h4 className="modal__header">
                                Name
                        </h4>
                            <h4 className="modal__header">
                                Description
                        </h4>

                        </div>
                        <div className="modal__margin" >
                            <input className="modal__input"
                                placeholder="name"
                                onChange={this.onChange("name")}
                                value={this.state.name || this.props.name}
                            />
                            <input className="modal__input"
                                placeholder="description"
                                onChange={this.onChange("description")}
                                value={this.state.description || this.props.description}
                            />
                        </div>
                        <div >
                            <button className="modal__save btn btn-info" onClick={this.onUpdate} > Save </button>
                            <button className="modal__close btn btn-info" onClick={this.onClose}> Close </button>
                        </div>

                    </div>
                </div>
            </Modal>
        );
    }
}

export { MyModal };