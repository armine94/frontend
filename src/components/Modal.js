import React, {Component} from 'react';

class Modal extends Component {
	state = { 		
        val1: 'aa',
        prioritet: '',
        startDate: '',
    
    }

	onClose = (e) => {
		this.props.onClose && this.props.onClose(e);
	}

	onChange = (index) => (e) => {
        e.preventDefault();
		
        if(e.target ) {            
            this.setState({
                [this.state.name]: e.target.value
            });
        } 
    }
    myChange = (e) => {
        this.setState({
            val1: e.target.value
        })
    }

	render() {
		const {name, prioritet, startDate, count} = this.props;
		
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
                                    <input onChange={this.myChange} value={this.state.val1}></input>
                                </td>
                                <td>
                                    <input></input>
                                </td>
                                <td>
                                    <input></input>
                                </td>
                            </tr>
                        </table>	
                    </div>
					<div style={footerStyle}>			
                   	  <button id="myButton" onClick={(e) => {this.onClose(e,)}}> Close </button>
					</div>
				</div>
			</div>
		);
	}
}


export {Modal};
