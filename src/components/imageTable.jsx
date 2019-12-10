import { ImageStore } from '../store/image.store';
import { Pagination } from './pagination';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { ShowFile } from './showFile';
import { Modal } from './modal';
import '../css/table.css';

@observer
class ImageTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playShow: true,
            pageNumber: 1,
            show: true,
            page: 1,
            size: 5,
            index: -1,
            changes: ''
        };
        this.deleteField.bind(this);
        this.imageStore = new ImageStore();
    }

    componentDidMount = () => {
        this.imageStore.getImages(this.state.pageNumber, this.state.size, () => { window.location.href = '/'; });
    }

    showModal = (e) => {
        const { author } = this.imageStore;
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
        if (e.target.value !== 'close' && this.imageStore.disabled) {
            this.imageStore.disabled = false;
            this.setState({
                index: e.target.value,
                playShow: !this.state.playShow,
                changes: true
            });
        } else if (e.target.value === 'close') {
            if (this.state.changes) {
                this.imageStore.disabled = true;
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
        const { originalName } = this.imageStore;
        let page;
        if (this.imageStore.currentPage < this.imageStore.count) {
            page = this.imageStore.currentPage;
        } else if (this.imageStore.metadata.length === this.state.pageNumber) {
            page = this.imageStore.count - this.state.pageNumber;
        } else {
            page = this.imageStore.count;
        }
        this.setState({page: page});
        this.imageStore.deleteImage(e.target.value, originalName[e.target.value], page, this.state.size, () => { window.location.href = '/'; });
    }

    createTable = () => {
        const { author, originalName, description, imageUrl, metadata } = this.imageStore;
        if (author && originalName && description && imageUrl && metadata) {
            return metadata.map((item, index) => {
                return (
                    <tbody className="table__center" key={index}>
                        <tr>
                            <th className="table__elem" scope="row">{index + this.state.pageNumber}</th>
                            <td>
                                <div className="image">
                                    <img className="img" alt="img" src={imageUrl[index]} />
                                </div>
                            </td>
                            <td className="table__elem">{item.FileSize} Kb</td>
                            <td className="table__elem">{item.ImageWidth}</td>
                            <td className="table__elem">{item.ImageHeight}</td>
                            <td className="table__elem">{description[index]}</td>
                            <td className="table__elem">{author[index]}</td>
                            <td className="table__elem">
                                <button className="btn btn__tool table__button btn__full" value={index} onClick={this.showPlayer} ></button>
                                <button className="btn btn__tool btn__edit table__button" value={index} onClick={this.showModal} ></button>
                                <ShowFile fileType="image" ImageWidth={item.ImageWidth} ImageHeight={item.ImageHeight} onClose={this.showPlayer} show={this.state.playShow} playing={this.state.play} index={this.state.index} imageUrl={imageUrl[this.state.index]} />
                                <Modal onClose={this.showModal} fileType="image" show={this.state.show} index={this.state.index} originalName={originalName[this.state.index]} description={description[this.state.index]} />
                                <button className="btn btn__tool btn__delete" value={index} onClick={this.deleteField}></button>
                            </td>
                        </tr>
                    </tbody>
                );
            });
        }
    }

    pagination = () => {
        if (this.imageStore.count > this.state.pageNumber) {
            return <Pagination fileType="image" count={this.imageStore.count} deletePage={this.state.page} deleted={this.imageStore.deleted} />;
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
                            <th>Width</th>
                            <th>Height</th>
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

export { ImageTable };