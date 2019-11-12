import { ImageStore } from '../store/image.store';
import { AudioStore } from '../store/audio.store';
import { VideoStore } from '../store/video.store';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import '../css/pagination.css'

@observer
class Pagination extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="pagination">
                <button className="btn" onClick={this.props.onpageChange(-1)} > &laquo; </button>
                <button className="btn btn-info" onClick={this.props.onpageChange(0)}> {this.props.pageNumber} </button>
                <button className="btn " onClick={this.props.onpageChange(1)} disabled={this.props.disabled} > &raquo; </button>
            </div>

        )
    }
}

export { Pagination };
