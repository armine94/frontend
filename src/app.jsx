import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import {Navbar} from './components/navbar';
import {Register} from './components/register';
import {Login} from './components/login';
import {Upload} from './components/upload';
import {View} from './components/view';

class  App extends Component {
  render() {
    return (
        <Router>
            <div>
                <Navbar/>
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
