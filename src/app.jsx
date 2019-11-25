import { BrowserRouter as Router, Route, Switch , Redirect} from 'react-router-dom';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Register } from './components/register';
import { Navbar } from './components/navbar';
import { Upload } from './components/upload';
import { Login } from './components/login';
import { View } from './components/view';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Navbar />
                    <Switch>
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/" component={Login} />
                        <Route exact path="/view" component={View} />
                        <Route exact path="/upload" component={Upload} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;