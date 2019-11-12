import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { VideoStore } from '../store/video.store';
import { Pagination } from './pagination'
import { MyModal } from './modal'
import '../css/table.css'

@observer
class VideoTable extends Component {
    constructor(props) {
        super(props);
        this.videoStore = new VideoStore();
        this.state = {
            name: this.videoStore.name,
            pageNumber: 1,
            show: true,
            size: 5,
            index: -1,
        }
        this.deleteField.bind(this);
    }

    componentDidMount = () => {
        this.videoStore.getVideos(this.state.pageNumber, this.state.size);
    }

    showModal = (e) => {
        this.setState({
            index: e.target.value,
            show: !this.state.show
        });
    }

    drawFields = () => {
        const fields = ['', 'Image', 'Name', 'Size', 'Description', ''];
        return fields.map((item, index) => {
            return (
                <th key={index}>
                    {item}
                </th>
            )
        })
    }

    draw = () => {
        const { name, originalName, description, path, metadata } = this.videoStore;
        if (name && metadata && originalName && path) {
            return metadata.map((item, index) => {
                return (
                    <tbody className="table_elem" key={index}>
                        <tr className="text-center" >
                            <th className="table__elem" scope="row">{index + 1}</th>
                            <td className="table__elem" >
                                <img className="table__image" alt="img" src={path[index]} />
                            </td>
                            <td className="table__elem"  >{name[index]}</td>
                            <td className="table__elem">{item.FileSize} Kb</td>
                            <td className="table__elem">{description[index]}</td>
                            <td scope="col" className="d-flex justify-content-around table__elem">
                                <button className="btn btn-success" value={index} onClick={this.showModal} >Edit</button>
                                <MyModal fileType='video' onClose={this.showModal} show={this.state.show} index={this.state.index} originalName={originalName[this.state.index]} name={name[this.state.index]} description={description[this.state.index]}></MyModal>
                                <button className="btn btn-danger" value={index} onClick={this.deleteField}>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                )
            })
        }
    }

    onpageChange = (index, err) => () => {
        let prevPage = this.state.pageNumber;
        switch (index) {
            case -1:
                if (prevPage > 1) {
                    this.videoStore.getVideos(this.state.pageNumber - 1, this.state.size);
                    this.setState({
                        pageNumber: prevPage - 1,
                    })
                }
                break;
            case 1:
                this.videoStore.getVideos(this.state.pageNumber + 1, this.state.size);
                this.setState({
                    pageNumber: prevPage + 1,
                })
                break;
            default:
        }
    }

    deleteField = (e) => {
        const { originalName } = this.videoStore;
        this.videoStore.deleteVideo(e.target.value, originalName[e.target.value], this.state.pageNumber, this.state.size);
    }

    render() {
        return (
            <div>
                <table className="table table-bordered">
                    <thead className="text-center">
                        <tr>
                            {this.drawFields()}
                        </tr>
                    </thead>
                    {this.draw()}
                </table>
                <Pagination  disabled={this.videoStore.disabled} onpageChange={this.onpageChange} pageNumber={this.state.pageNumber} />
            </div>
        )
    }
}

export { VideoTable };
