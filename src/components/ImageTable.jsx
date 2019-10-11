import React, { Component } from 'react';
import axios from 'axios';
import { Button, Input } from 'reactstrap';
import Modal from './Modal';
import './Table.css'


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
        axios.get("/upload/image",{
            params: {
              pageNumber: this.state.pageNumber,
              size: this.state.size,
            },	    
        }).then(res => { // then print response status
            const base = [];
            for(let i = 0; i < this.state.size; i++) {
                base[i] =  btoa(
                    new Uint8Array( res.data.files[i].data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                    ),
                )    
                const metadata = this.state.metadata;
                const source = this.state.source;
                source.push("data:;base64," + base[i]);
                metadata.push(res.data.message[i].metadata)
                this.setState({source}); 
                this.setState({metadata});          
            }     
            
        }).catch(err => { // then print response status
            console.log(err);
        })
    }

    delete = () => {
        axios.delete("/upload/image",{
            params: {
                name: "fileName",
            },	    
        }).then(res => { // then print response status
           console.log(res);           
        }).catch(err => { // then print response status
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

export default ImageTable;
