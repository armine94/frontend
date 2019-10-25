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
