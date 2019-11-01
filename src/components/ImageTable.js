import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { ImageStore } from '../store/Image.DAO';
import { Modal } from './Modal';
import '../css/Table.css'
import '../css/Pagination.css'

@observer
class ImageTable extends Component {
    constructor(props){
        super(props);
        this.imageStore = new ImageStore();
        this.state = {
            name: this.imageStore.name,
            pageNumber: 1,
            disable: false,
            show: true,            
            size: 5,
            list: [
                {
                  name: 'aaa',
                  description: 'bbb',
                },
              ],
        }
    }

    componentDidMount() { 
        this.imageStore.getImages(this.state.pageNumber, this.state.size);   
    }

    drawFields = () => {
        const fields = ['', 'Image', 'Name', 'Size', 'Width', 'Height', 'Description' ];
        return fields.map((item, index) => {
            return (
                <th key={index}>
                    {item}
                </th>
            )
        })
    }

    draw = (name, description, path,  metadata) => {

        if( name && metadata){
            return metadata.map((item, index) => {
                return (
                    <tr  className="text-center" key={index}>
                        <th scope="row">{index + 1}</th>
                        <td id="image">
                            <img className="image" src={path[index]}/>
                        </td>
                        <td>{name[index]}</td>                
                        <td>{item.FileSize} Kb</td>
                        <td>{item.ImageWidth}</td>
                        <td>{item.ImageHeight}</td>
                        <td> desc</td>
                        <td scope="col" className="d-flex justify-content-around">
                            <button onClick={this.showModal} >Edit</button>
                            <Modal  onClose={this.showModal} show={this.state.show} name={name[index]}></Modal>
                            <button onClick={this.delete}>Delete</button>
                        </td>
                    </tr>
                )
            })
        }
    }

    showModal = () => {
        this.setState ({
        show: !this.state.show
        });
    }

    onpageChange (index, err) {
        let prevPage = this.state.pageNumber; 
        switch (index) {
            case -1:
                if(prevPage > 1) { 
                    const data = {
                        pageNumber: this.state.pageNumber - 1,
                        size: this.state.size,
                    }
                    this.imageStore.getImages(this.state.pageNumber - 1, this.state.size);
                    this.setState({
                        pageNumber: prevPage - 1,
                        disable: false
                    })
                }
                break;
            case 1:
                if(err) {
                    this.setState({
                        disable: true
                    })
                } else {
                    const data = {
                        pageNumber: this.state.pageNumber + 1,
                        size: this.state.size,
                    }
                    this.imageStore.getImages(this.state.pageNumber + 1, this.state.size);
                    this.setState({
                        pageNumber: prevPage + 1,
                    })
                }
                break;
            default:
                break;
        }
    }

    render() {

         const { name, description, path, metadata, err } = this.imageStore;
        return (
            <div>

                <table className="table table-bordered">
                    <thead  className="text-center">
                        <tr>
                            {this.drawFields()}
                        </tr>
                    </thead>
                    <tbody>

                        {this.draw(name, description, path, metadata)}
                    </tbody>
                </table>
                <div className="pagination">
                    <button className="btn" onClick={ this.onpageChange.bind(this, -1, err) } > &laquo; </button>
                    <button className="btn btn-info" onClick={ this.onpageChange.bind(this, 0, err) }> { this.state.pageNumber } </button>
                    <button className="btn" onClick={ this.onpageChange.bind(this, 1, err) }  disabled={ this.state.disable } > &raquo; </button>
                </div>

            </div>
        )
    }
}

export  {ImageTable};