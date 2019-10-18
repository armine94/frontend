import React, { Component } from 'react';
import axios from 'axios';
import {Modal} from './Modal';
import '../css/Table.css'

import {getImages} from './Image.DAO'

import { ToastContainer, toast } from 'react-toastify';

class ImageTable extends Component {
    constructor(props){
        super(props);
        this.state = {
            metadata: [],
            source: [],
            show: true,
            pageNumber: 1,
            size: 5,
        }
    }

    componentDidMount() { 
        getImages(this.state.pageNumber, this.state.size)
        .then(result => {
            let {metadata, source} = result; 
            this.setState({metadata});  
            this.setState({source}); 
        })
        .catch( err => {
            console.log(err);            
        })     
    }

    draw = () => {
        return this.state.source.map((item, index) => {
            return (
                <tr  className="text-center" key={index}>
                    <th scope="row">{index + 1}</th>
                    <td id="image">
                        <img className="image" src={this.state.source[index]} />
                    </td>

                    <td>{this.state.metadata[index].FileSize} Kb</td>
                    <td>{this.state.metadata[index].ImageWidth}</td>
                    <td>{this.state.metadata[index].ImageHeight}</td>
                    <td>{this.state.metadata[index].FileName}</td>                

                    <td scope="col" className="d-flex justify-content-around">
                        <button onClick={this.showModal} >edit</button>
                        <Modal  onClose={this.showModal}  show={this.state.show}> 
                        </Modal>
                        <button onClick={this.delete}> Delete</button>
                    </td>
                </tr>
            )
        })
    }

    showModal = () =>{
        this.setState ({
        show: !this.state.show
        });
    }

    render() {
        return (
            <table className="table table-bordered">
                <thead  className="text-center">
                    <tr>
                        <th></th>
                        <th>
                            Image
                        </th>
                        <th>
                            Size
                        </th>
                        <th>
                            Width
                        </th>
                        <th>
                            Height
                        </th>
                        <th>
                            Name
                        </th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {this.draw()}
                </tbody>
            </table>
        )
    }
}

export  {ImageTable};