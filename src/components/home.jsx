import React, { Component } from 'react';
import Logo from '../images/logo.png';

class Home extends Component {
    render() {
        return <img className='bg-img' src={Logo}/>
    }
}

export { Home };