import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { ImageStore } from '../store/image.store';
import { Pagination } from './pagination'
import { MyModal } from './modal'
import '../css/table.css'

@observer
class ImageTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            show: true,
            size: 5,
            index: -1,
        }
        this.deleteField.bind(this);
        this.imageStore = new ImageStore();
    }

    componentDidMount = () => {
        this.imageStore.getImages(this.state.pageNumber, this.state.size);
    }

    showModal = (e) => {
        this.setState({
            index: e.target.value,
            show: !this.state.show
        });
    }

    drawFields = () => {
        const fields = ['', 'Image', 'Name', 'Size', 'Width', 'Height', 'Description', ''];
        return fields.map((item, index) => {
            return (
                <th key={index}>
                    {item}
                </th>
            )
        })
    }

    draw = () => {
        const { name, originalName, description, path, metadata } = this.imageStore;
        if (name && metadata) {
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
                            <td className="table__elem">{item.ImageWidth}</td>
                            <td className="table__elem">{item.ImageHeight}</td>
                            <td className="table__elem">{description[index]}</td>
                            <td scope="col" className="d-flex justify-content-around table__elem">
                                <button className="btn btn-success" value={index} onClick={this.showModal} >Edit</button>
                                <MyModal onClose={this.showModal} fileType='image' show={this.state.show} index={this.state.index} originalName={originalName[this.state.index]} name={name[this.state.index]} description={description[this.state.index]}></MyModal>
                                <button className="btn btn-danger" value={index} onClick={this.deleteField}>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                )
            })
        }
    }

    onpageChange = (index, err) => () => {
        const prevPage = this.state.pageNumber;
        switch (index) {
            case -1:
                if (prevPage > 1) {
                    this.imageStore.getImages(this.state.pageNumber - 1, this.state.size);
                    this.setState({
                        pageNumber: prevPage - 1,
                    })
                }
                break;
            case 1:
                this.imageStore.getImages(this.state.pageNumber + 1, this.state.size);
                this.setState({
                    pageNumber: prevPage + 1,
                })
                break;
            default:
                break;
        }
    }

    deleteField = (e) => {
        const { originalName } = this.imageStore;
        this.imageStore.deleteImage(e.target.value, originalName[e.target.value], this.state.pageNumber, this.state.size);
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
                <Pagination disabled={this.imageStore.disabled} onpageChange={this.onpageChange} pageNumber={this.state.pageNumber} disabled={this.imageStore.disabled}/>
            </div>
        )
    }
}

export { ImageTable };
