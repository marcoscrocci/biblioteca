import React from 'react'
import {
    //BrowserRouter as Router,
    HashRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import Main from './pages/main';
import Livros from './pages/livros';
import LivroRelatorio from './pages/livros/LivroRelatorio';
import Usuarios from './pages/usuarios';
import TestFirebase from './pages/TestFirebase';
import Teste from './pages/teste';
import Autor from './pages/autores';



export default function Routers(props) {
    return (
        <Router>       
            <Switch>            
                <Route path='/testfirebase' component={TestFirebase} />
                <Route path='/teste' component={Teste} />
                <Route path='/livros/relatorio/:token' component={LivroRelatorio} />
                <Route path='/livros' component={Livros} />
                <Route path='/usuarios' component={Usuarios} />
                <Route path='/autores' component={Autor} />
                <Route path='/' component={Main} />
                <Redirect from='*' to='/' />
            </Switch>
        </Router>
    )
}