import { ImageStore } from '../store/image.store';
import { Pagination } from './pagination';
import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { MyModal } from './modal';
import '../css/table.css';

@observer
class ImageTable extends Component {
    constructor(props, context) {
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
        this.imageStore.getImages(this.state.pageNumber, this.state.size, () => window.location.href = '/');
    }

    showModal = (e) => {
        this.setState({
            index: e.target.value,
            show: !this.state.show
        });
    }

    onpageChange = (index, err) => () => {
        const prevPage = this.state.pageNumber;
        switch (index) {
            case -1:
                if (prevPage > 1) {
                    this.imageStore.getImages(this.state.pageNumber - 1, this.state.size, () => window.location.href = '/');
                    this.setState({
                        pageNumber: prevPage - 1,
                    })
                } 
                break;
            case 1:
                this.imageStore.getImages(this.state.pageNumber + 1, this.state.size, () => window.location.href = '/');
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
        this.imageStore.deleteImage(e.target.value, originalName[e.target.value], this.state.pageNumber, this.state.size, () => window.location.href = '/');
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

    drawItem = () => {
        const { name, originalName, description, imageUrl, metadata } = this.imageStore;
        if (name && metadata) {
            return metadata.map((item, index) => {
                return (
                    <tbody className="table_elem" key={index}>
                        <tr className="text-center" >
                            <th className="table__elem" scope="row">{index + 1}</th>
                            <td className="table__elem" >
                                <img className="table__image" alt="img" src={imageUrl[index]} />
                            </td>
                            <td className="table__elem"  >{name[index]}</td>
                            <td className="table__elem">{item.FileSize} Kb</td>
                            <td className="table__elem">{item.ImageWidth}</td>
                            <td className="table__elem">{item.ImageHeight}</td>
                            <td className="table__elem">{description[index]}</td>
                            <td scope="col" className="table__elem">
                                <button className="btn btn__green" value={index} onClick={this.showModal} >Edit</button>
                                <MyModal onClose={this.showModal} fileType='image' show={this.state.show} index={this.state.index} originalName={originalName[this.state.index]} name={name[this.state.index]} description={description[this.state.index]}></MyModal>
                                <button className="btn btn__red" value={index} onClick={this.deleteField}>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                )
            })
        }
    }

    render() {
        return (
            <div>
                <table className="table table-bordered myTable">
                    <thead className="text-center">
                        <tr className="table__elem">
                            {this.drawFields()}
                        </tr>
                    </thead>
                    {this.drawItem()}
                </table>
                <Pagination disabled={this.imageStore.disabled} onpageChange={this.onpageChange} pageNumber={this.state.pageNumber} disabled={this.imageStore.disabled}/>
            </div>
        )
    }
}

export { ImageTable };