import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Navbar} from './components/Navbar';
import {Register} from './components/Register';
import {Login} from './components/Login';
import {Home} from './components/Home';
import {Upload} from './components/Upload';
import {View} from './components/View';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar/>
                    <Route exact path="/" component={Home} />
                    <div className="container" >
                        <Route exact path="/register" component={ Register } />
                        <Route exact path="/login"  component={ Login } />
                        <Route exact path="/view" component={View} />
                        <Route exact path="/upload" component={Upload}/>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;