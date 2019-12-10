import { ImageStore } from '../store/image.store';
import { AudioStore } from '../store/audio.store';
import { VideoStore } from '../store/video.store';
import { PDFStore } from '../store/pdf.store';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import '../css/pagination.css';

@observer
class Pagination extends Component {
    static propTypes = {
        count: PropTypes.any,
        deleted: PropTypes.any,
        deletePage: PropTypes.any,
        fileType: PropTypes.any
    };

    constructor(props) {
        super(props);
        this.state = {
            currentPage: 2,
            nextPage: 1,
            prevPage: 1,
            firstPage: 1,
            getPage: 1,
            second: 2,
            three: 3,
            size: 5,
            increment: 1,
            decrement: -1,
            active: 0,
            lastPage: this.props.count,
            class__0: 'btn pageination__button current__page',
            class__1: 'btn pageination__button',
            class__2: 'btn pageination__button'
        };
        this.pdfStore = new PDFStore();
        this.imageStore = new ImageStore();
        this.audioStore = new AudioStore();
        this.videoStore = new VideoStore();
    }

    pageNumber = (e) => {
        let page = this.state.currentPage;
        let getPage = this.state.getPage;
        switch (e.target.value) {
            case 'first':
                page = this.state.second;
                getPage = this.state.firstPage;
                this.setState({ class__0: 'btn pageination__button current__page', class__2: 'btn pageination__button', class__1: 'btn pageination__button', active: '0' });
                break;
            case 'prev':
                if (this.state.getPage > this.state.firstPage) {
                    if (getPage === page + this.state.decrement) {
                        this.setState({ class__0: 'btn pageination__button current__page', class__2: 'btn pageination__button', class__1: 'btn pageination__button', active: '0' });
                        page = this.state.currentPage + this.state.decrement;
                    } else if (getPage === page + this.state.increment) {
                        this.setState({ class__1: 'btn pageination__button current__page', class__2: 'btn pageination__button', class__0: 'btn pageination__button', active: '1' });
                    } else if (getPage === page) {
                        this.setState({ class__0: 'btn pageination__button current__page', class__1: 'btn pageination__button', class__2: 'btn pageination__button', active: '0' });
                    }
                    getPage = this.state.getPage + this.state.decrement;
                }
                break;
            case '0':
                this.setState({ class__0: 'btn pageination__button current__page', class__1: 'btn pageination__button', class__2: 'btn pageination__button', active: '0' });
                getPage = this.state.currentPage + this.state.decrement;
                break;
            case '1':
                if (this.state.lastPage > this.state.firstPage) {
                    this.setState({ class__1: 'btn pageination__button current__page', class__2: 'btn pageination__button', class__0: 'btn pageination__button', active: '1' });
                    page = this.state.currentPage;
                    getPage = this.state.currentPage;
                }
                break;
            case '2':
                if (this.state.lastPage > this.state.second) {
                    this.setState({ class__2: 'btn pageination__button current__page', class__1: 'btn pageination__button', class__0: 'btn pageination__button', active: '2' });
                    page = this.state.currentPage;
                    getPage = this.state.currentPage + this.state.increment;
                }
                break;
            case 'next':
                if (this.state.currentPage <= this.state.lastPage) {
                    if (getPage === page + this.state.decrement) {
                        this.setState({ class__1: 'btn pageination__button current__page', class__2: 'btn pageination__button', class__0: 'btn pageination__button', active: '1' });
                    } else if (getPage === page + this.state.increment && (page + this.state.increment) !== this.state.lastPage) {
                        this.setState({ class__2: 'btn pageination__button current__page', class__1: 'btn pageination__button', class__0: 'btn pageination__button', active: '2' });
                        page = this.state.currentPage + this.state.increment;
                    } else if (getPage === page && page !== this.state.lastPage) {
                        this.setState({ class__2: 'btn pageination__button current__page', class__0: 'btn pageination__button', class__1: 'btn pageination__button', active: '2' });
                    }
                    if (this.state.getPage < this.state.lastPage) {
                        getPage = this.state.getPage + this.state.increment;
                    }
                }
                break;
            case 'last':
                if (this.state.lastPage === this.state.firstPage) {
                    getPage = this.state.lastPage;
                    this.setState({ class__0: 'btn pageination__button current__page', class__2: 'btn pageination__button', class__1: 'btn pageination__button', active: '0' });
                } else if (this.state.lastPage === this.state.second) {
                    getPage = this.state.lastPage;
                    this.setState({ class__1: 'btn pageination__button current__page', class__2: 'btn pageination__button', class__0: 'btn pageination__button', active: '1' });
                } else if (this.state.lastPage === this.state.three) {
                    getPage = this.state.lastPage;
                    this.setState({ class__2: 'btn pageination__button current__page', class__1: 'btn pageination__button', class__0: 'btn pageination__button', active: '2' });
                } else {
                    page = this.state.lastPage + this.state.decrement;
                    getPage = this.state.lastPage;
                    this.setState({ class__2: 'btn pageination__button current__page', class__0: 'btn pageination__button', class__1: 'btn pageination__button', active: '2' });
                }
                break;

            default:
                break;
        }
        this.setState({ currentPage: page });
        this.setState({ getPage: getPage });
        if (getPage <= this.state.lastPage) {
            this.getFileData(getPage);
        }
    }

    getFileData = (page) => {
        switch (this.props.fileType) {
            case 'image':
                this.setState({ lastPage: this.imageStore.count });
                this.imageStore.getImages(page, this.state.size, () => { window.location.href = '/'; });
                break;
            case 'audio':
                this.setState({ lastPage: this.audioStore.count });
                this.audioStore.getAudios(page, this.state.size, () => { window.location.href = '/'; });
                break;
            case 'video':
                this.setState({ lastPage: this.videoStore.count });
                this.videoStore.getVideos(page, this.state.size, () => { window.location.href = '/'; });
                break;
            case 'pdf':
                this.setState({ lastPage: this.pdfStore.count });
                this.pdfStore.getPdfs(page, this.state.size, () => { window.location.href = '/'; });
                break;
            default:
                break;
        }
    }

    f = () => {
        if (this.props.deletePage !== this.state.getPage && this.props.deleted) {
            switch (this.state.active) {
                case '1':
                    this.setState({ class__0: 'btn pageination__button current__page', class__2: 'btn pageination__button', class__1: 'btn pageination__button', active: '0', getPage: this.props.deletePage });
        
                    break;
                case '2':
                    this.setState({ class__1: 'btn pageination__button current__page', class__0: 'btn pageination__button', class__2: 'btn pageination__button', active: '1', getPage: this.props.deletePage });
        
                    break;
                default:
                    break;
            }

        }
    }

    render() {
        return (
            <div className="container">
                <div className="pageination">
                    {this.f()}
                    <button className=" btn pageination__button" value="first" onClick={this.pageNumber}>First</button>
                    <button className=" btn pageination__button" value="prev" onClick={this.pageNumber}>&laquo;</button>
                    <button className={this.state.class__0} value="0" onClick={this.pageNumber}>{this.state.currentPage + this.state.decrement}</button>
                    <button className={this.state.class__1} value="1" onClick={this.pageNumber}>{this.state.currentPage}</button>
                    <button className={this.state.class__2} value="2" onClick={this.pageNumber}>{this.state.currentPage + this.state.increment}</button>
                    <button className=" btn pageination__button" value="next" onClick={this.pageNumber}> &raquo;</button>
                    <button className=" btn pageination__button" value="last" onClick={this.pageNumber}>Last</button>
                </div>
            </div>
        );
    }
}

export { Pagination };