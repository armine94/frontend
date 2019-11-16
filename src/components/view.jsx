import React, { Component } from 'react';
import { ImageTable } from './imageTable';
import { AudioTable } from './audioTable';

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileType: "image",
        }
    }

    changeFileType = (name) => () => {
        this.setState({
            fileType: name
        });
    }

    show = () => {
        switch (this.state.fileType) {
            case "image":
                return <ImageTable />;
            case "audio":
                return <AudioTable />;
            default:
                return <ImageTable />;
        }
    }

    render() {
        return (
            <div>
                <table className="table table-bordered">
                    <thead className="text-center">
                        <tr>
                            <th scope="col">
                            </th>
                            <th scope="col">
                                <button type="button" className="btn btn-info" onClick={this.changeFileType("image")}>Image</button>
                            </th>
                            <th scope="col">
                                <button type="button" className="btn btn-info" onClick={this.changeFileType("video")}>Video</button>
                            </th>
                            <th scope="col">
                                <button type="button" className="btn btn-info" onClick={this.changeFileType("audio")}>Audio</button>
                            </th>
                            <th scope="col">
                                <button type="button" className="btn btn-info" onClick={this.changeFileType("text")}>Text</button>
                            </th>
                        </tr>
                    </thead>
                </table>
                {this.show()}
            </div>
        )
    }
}

export { View };