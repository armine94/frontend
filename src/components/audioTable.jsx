import { AudioStore } from '../store/audio.store';
import { Pagination } from './pagination';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { ShowFile } from './showFile';
import { Modal } from './modal';
import '../css/table.css';

@observer
class AudioTable extends Component {
    constructor(props) {
        super(props);
        this.audioStore = new AudioStore();
        this.state = {
            playShow: true,
            pageNumber: 1,
            changes: '',
            page: 1,
            show: true,
            index: -1,
            size: 5
        };
        this.deleteField.bind(this);
    }

    componentDidMount = () => {
        this.audioStore.getAudios(this.state.pageNumber, this.state.size, () => { window.location.href = '/'; });
    }

    showModal = (e) => {
        const { author } = this.audioStore;
        if (e.target.value && author[e.target.value] === sessionStorage.getItem('email')) {
            this.setState({
                index: e.target.value,
                show: !this.state.show
            });
        } else if (e.target.value === 'cancel' || e.target.value === 'save') {
            this.setState({
                index: -1,
                show: !this.state.show
            });
        }
    }

    showPlayer = (e) => {
        if (e.target.value !== 'close' && this.audioStore.disabled) {
            this.audioStore.disabled = false;
            this.setState({
                index: e.target.value,
                playShow: !this.state.playShow,
                changes: true
            });
        } else if (e.target.value === 'close') {
            if (this.state.changes) {
                this.audioStore.disabled = true;
            }
            this.setState({
                index: -1,
                playShow: !this.state.playShow,
                changes: ''
            });
        } else {
            this.setState({
                index: e.target.value,
                playShow: !this.state.playShow
            });
        }
    }

    deleteField = (e) => {
        const { originalName } = this.audioStore;
        let page;
        if(this.audioStore.currentPage < this.audioStore.count) {
            page = this.audioStore.currentPage;
        } else if( this.audioStore.metadata.length === this.state.pageNumber){
            page = this.audioStore.count - this.state.pageNumber;
        } else {
            page = this.audioStore.count;
        }
        this.setState({page: page});
        this.audioStore.deleteAudio(e.target.value, originalName[e.target.value], page, this.state.size, () => { window.location.href = '/'; });
    }

    createTable = () => {
        const { author, originalName, description, imageUrl, audioUrl, metadata } = this.audioStore;
        if (author && originalName && description && imageUrl && audioUrl && metadata) {
            return metadata.map((item, index) => {
                return (
                    <tbody key={index}>
                        <tr>
                            <th className="table__elem" scope="row">{index + this.state.pageNumber}</th>
                            <td>
                                <div className="image">
                                    <img className="img" alt="img" src={imageUrl[index]} />
                                </div>
                            </td>
                            <td className="table__elem">{item.FileSize} Kb</td>
                            <td className="table__elem">{description[index]}</td>
                            <td className="table__elem">{author[index]}</td>
                            <td className="table__elem">
                                <button className="btn btn__tool btn__play" value={index} onClick={this.showPlayer} ></button>
                                <button className="btn btn__tool btn__edit" value={index} onClick={this.showModal} ></button>
                                <ShowFile fileType="audio" onClose={this.showPlayer} show={this.state.playShow} playing={this.state.play} index={this.state.index} audioUrl={audioUrl[this.state.index]} imageUrl={imageUrl[this.state.index]} />
                                <Modal fileType="audio" onClose={this.showModal} show={this.state.show} index={this.state.index} originalName={originalName[this.state.index]} description={description[this.state.index]}/>
                                <button className="btn btn__tool btn__delete" value={index} onClick={this.deleteField}></button>
                            </td>
                        </tr>
                    </tbody>
                );
            });
        }
    }

    pagination = () => {
        if(this.audioStore.count > this.state.pageNumber) {
            return <Pagination fileType="audio" count={this.audioStore.count} deletePage={this.state.page} deleted={this.audioStore.deleted}/>;
        }
    }

    render() {
        return (
            <div className="container">
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th>#</th>
                            <th>Image</th>
                            <th>Size</th>
                            <th>Description</th>
                            <th>Author</th>
                            <th>Tools</th>
                        </tr>
                    </thead>
                    {this.createTable()}
                </table>
                {this.pagination()}
            </div>
        );
    }
}

export { AudioTable };