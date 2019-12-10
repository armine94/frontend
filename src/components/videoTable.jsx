import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { VideoStore } from '../store/video.store';
import { Pagination } from './pagination';
import { ShowFile } from './showFile';
import { Modal } from './modal';
import '../css/table.css';

@observer
class VideoTable extends Component {
    constructor(props) {
        super(props);
        this.videoStore = new VideoStore();
        this.state = {
            size: 5,
            page: 1,
            index: -1,
            show: true,
            pageNumber: 1,
            playShow: true,
            changes: ''
        };
        this.deleteField.bind(this);
    }

    componentDidMount = () => {
        this.videoStore.getVideos(this.state.pageNumber, this.state.size);
    }

    showModal = (e) => {
        const { author } = this.videoStore;
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
        if (e.target.value !== 'close' && this.videoStore.disabled) {
            this.videoStore.disabled = false;
            this.setState({
                index: e.target.value,
                playShow: !this.state.playShow,
                changes: true
            });
        } else if (e.target.value === 'close') {
            if (this.state.changes) {
                this.videoStore.disabled = true;
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
        const { originalName } = this.videoStore;
        let page;
        if (this.videoStore.currentPage < this.videoStore.count) {
            page = this.videoStore.currentPage;
        } else if (this.videoStore.metadata.length === this.state.pageNumber) {
            page = this.videoStore.count - this.state.pageNumber;
        } else {
            page = this.videoStore.count;
        }
        this.setState({ page: page });
        this.videoStore.deleteVideo(e.target.value, originalName[e.target.value], page, this.state.size, () => { window.location.href = '/'; });
    }

    createTable = () => {
        const { author, originalName, description, imageUrl, videoUrl, metadata } = this.videoStore;
        if (author && metadata && originalName && imageUrl && description && videoUrl) {
            return metadata.map((item, index) => {
                return (
                    <tbody key={index}>
                        <tr>
                            <th className="table__elem" scope="row">{index + this.state.pageNumber}</th>
                            <td className="tableImage">
                                <div className="image">
                                    <img className="img" alt="img" src={imageUrl[index]} />
                                </div>
                            </td>
                            <td className="table__elem">{item.FileSize} Kb</td>
                            <td className="table__elem">{author[index]}</td>
                            <td className="table__elem">{description[index]}</td>
                            <td className="table__elem">
                                <button className="btn btn__tool btn__play" value={index} onClick={this.showPlayer} ></button>
                                <button className="btn btn__tool btn__edit" value={index} onClick={this.showModal} ></button>
                                <ShowFile fileType="video" onClose={this.showPlayer} show={this.state.playShow} playing={this.state.play} index={this.state.index} videoUrl={videoUrl[this.state.index]} />
                                <Modal fileType="video" onClose={this.showModal} show={this.state.show} index={this.state.index} originalName={originalName[this.state.index]} description={description[this.state.index]} />
                                <button className="btn btn__tool btn__delete" value={index} onClick={this.deleteField}></button>
                            </td>
                        </tr>
                    </tbody>
                );
            });
        }
    }

    pagination = () => {
        if (this.videoStore.count > this.state.pageNumber) {
            return <Pagination fileType="video" count={this.videoStore.count} deletePage={this.state.page} deleted={this.videoStore.deleted} />;
        }
    }

    render() {
        return (
            <div>
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

export { VideoTable };