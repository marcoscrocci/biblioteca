import React from 'react'
import {
    //BrowserRouter as Router,
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Main from './pages/main';
import TestFirebase from './pages/TestFirebase';

export default function Routers(props) {
    return (
        <Router>       
            <Switch>            
                <Route path='/testfirebase' component={TestFirebase} />
                <Route path='/' component={Main} />
                <Redirect from='*' to='/' />
            </Switch>
        </Router>
    )
}