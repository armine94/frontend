import React, { Component } from 'react';
import { observer } from 'mobx-react';

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