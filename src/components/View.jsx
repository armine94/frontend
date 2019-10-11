import React, { Component } from 'react';
import './Table.css'
import ImageTable from './ImageTable';

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileType: "image"
        }
    }

    changeFyleType = (name) => {
        this.setState({
            fileType: name
        });
    }
    
    show = () => {
        switch(this.state.fileType) {
            case "image":          
                return <ImageTable/>;
            case "text": 
                return <div> TextTable</div>;
            case "video": 
                return <div> VideoTable</div>;
            case "audeo": 
                return <div> AudeoTable</div>;
            default:
                return <ImageTable/>;            
        }
    }

    render() {
        return (
            <div>
                <table className="table table-bordered">
                    <thead  className="text-center"> 
                        <tr>
                        <th scope="col">

                        </th>
                        <th scope="col">
                            <button type="button" className="btn btn-info" onClick={() => this.changeFyleType("image")}>Image</button>
                        </th>
                        <th scope="col">
                            <button type="button" className="btn btn-info" onClick={() => this.changeFyleType("video")}>Video</button>                        
                        </th>
                        <th scope="col">
                            <button type="button" className="btn btn-info" onClick={() => this.changeFyleType("audeo")}>Audeo</button>
                        </th>
                        <th scope="col">
                            <button type="button" className="btn btn-info" onClick={() => this.changeFyleType("text")}>Text</button>
                        </th> 
                        </tr>
                    </thead>
                </table>
                {this.show()}
            </div>
        )
    }

}

export default View;
