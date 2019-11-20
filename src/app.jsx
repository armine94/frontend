import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Register } from './components/register';
import { Navbar } from './components/navbar';
import { Upload } from './components/upload';
import { Login } from './components/login';
import { View } from './components/view';
import { Home } from './components/home';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/view" component={View} />
                        <Route exact path="/upload" component={Upload} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;