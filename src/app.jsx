import { BrowserRouter as Router, Route, Switch , Redirect} from 'react-router-dom';
import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import { PageNotFound } from './components/pageNotFound';
import { Register } from './components/register';
import { Upload } from './components/upload';
import { Login } from './components/login';
import { View } from './components/view';
import { Forgot } from './components/forgot';

class App extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/registr" component={Register} />
                        <Route exact path="/" component={Login} />
                        <Route exact path="/view" component={View} />
                        <Route exact path="/upload" component={Upload} />
                        <Route exact path="/forgot" component={Forgot} />
                        <Route exact path="*" component={PageNotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;