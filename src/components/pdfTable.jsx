import { PDFStore } from '../store/pdf.store';
import { Pagination } from './pagination';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { ShowFile } from './showFile';
import { Modal } from './modal';
import '../css/table.css';

@observer
class PDFTable extends Component {
    constructor(props) {
        super(props);
        this.pdfStore = new PDFStore();
        this.state = {
            pageNumber: 1,
            show: true,
            playShow: true,
            size: 5,
            page: 1,
            index: -1,
            changes: ''
        };
        this.deleteField.bind(this);
    }

    componentDidMount = () => {
        this.pdfStore.getPdfs(this.state.pageNumber, this.state.size, () => { window.location.href = '/'; });
    }

    showModal = (e) => {
        const { author } = this.pdfStore;
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
        if (e.target.value !== 'close' && this.pdfStore.disabled) {
            this.pdfStore.disabled = false;
            this.setState({
                index: e.target.value,
                playShow: !this.state.playShow,
                changes: true
            });
        } else if (e.target.value === 'close') {
            if (this.state.changes) {
                this.pdfStore.disabled = true;
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
        const { originalName } = this.pdfStore;
        let page;
        if (this.pdfStore.currentPage < this.pdfStore.count) {
            page = this.pdfStore.currentPage;
        } else if (this.pdfStore.metadata.length === this.state.pageNumber) {
            page = this.pdfStore.count - this.state.pageNumber;
        } else {
            page = this.pdfStore.count;
        }
        this.setState({page: page});
        this.pdfStore.deletePdf(e.target.value, originalName[e.target.value], page, this.state.size, () => { window.location.href = '/'; });
    }

    createTable = () => {
        const { author, originalName, description, imageUrl, docUrl, metadata } = this.pdfStore;
        if (author && metadata && originalName && description && imageUrl && docUrl) {
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
                            <td className="table__elem">{author[index]}</td>
                            <td className="table__elem">{description[index]}</td>
                            <td className="table__elem">
                                <button className="btn btn__tool table__button btn__full" value={index} onClick={this.showPlayer} ></button>
                                <button className="btn btn__tool btn__edit table__button" value={index} onClick={this.showModal} ></button>
                                <ShowFile fileType="pdf" onClose={this.showPlayer} show={this.state.playShow} playing={this.state.play} index={this.state.index} docUrl={docUrl[this.state.index]} imageUrl={imageUrl[this.state.index]} />
                                <Modal fileType="pdf" onClose={this.showModal} show={this.state.show} index={this.state.index} originalName={originalName[this.state.index]} description={description[this.state.index]} />
                                <button className="btn btn__tool btn__delete" value={index} onClick={this.deleteField}></button>
                            </td>
                        </tr>
                    </tbody>
                );
            });
        }
    }

    pagination = () => {
        if (this.pdfStore.count > this.state.pageNumber) {
            return <Pagination fileType="pdf" count={this.pdfStore.count} deletePage={this.state.page} deleted={this.pdfStore.deleted}/>;
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

export { PDFTable };