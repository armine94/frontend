import PageNotFoundImg from '../images/pageNotFound.jpg';
import React, { Component } from 'react';
import { Navbar } from './navbar';
import '../css/pageNotFound.css';

class PageNotFound extends Component {
    render() {
        return (
            < >
                <Navbar />
                <div className="container-fluid pageNotFound">
                    <img src={PageNotFoundImg} alt="img" />
                </div>
            </>
        );
    }
}

export { PageNotFound };