import React, {Component} from 'react';

const backdropStyle = {  
position: 'fixed',
top: 0,
bottom: 0,
left: 0,
right: 0,
backgroundColor: 'rgba(0, 0, 0, 0.4 )',
padding: 50,

}

const footerStyle = { 
bottom:30,
margin:200 ,
}

const modalStyle = {
  backgroundColor: '#fff',
  borderRadius: 5,
  maxWidth: 700,
  minHeight: 300,
  margin: '0 auto',
  padding: 30,
  position: 'relative',
}


class Modal extends Component {
	state = { 		
        name: this.props.name,
        description: this.props.description,
    }

	onClose = (e) => {
		this.props.onClose && this.props.onClose(e);
	}

	onChange = (item) => (e) => {
        this.onChange = this.onChange.bind(this);
        if(e.target ) {
            this.setState({
                [item]: e.target.value
            });
        }
    }

	render() {
		const {name, size, width, height} = this.props;
		if(this.props.show){ 
			return null;
		}
		return (
			<div style={backdropStyle}>
                <div style={modalStyle}>{this.props.children}
                    <div>
                        <table>
                            <tr>
                                <td>
                                    <input placeholder="name" onChange={this.onChange("name")} value={this.state.name}></input>
                                </td>
                                <td>
                                    <input placeholder="description" onChange={this.onChange("description")} value={this.state.description}></input>
                                </td>
                            </tr>
                        </table>	
                    </div>
					<div style={footerStyle}>	
                        <button id="myButton" onClick={this.props.list(this.state,this)}> Save </button>		
                   	    <button id="myButton" onClick={(e) => {this.onClose(e,)}}> Close </button>
					</div>
				</div>
			</div>
		);
	}
}


export {Modal};
