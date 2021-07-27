import React, { useContext, useEffect } from 'react'
import App from './App'
import GlobalContext from './context/GlobalContext'
import Login from './pages/login'
import { recuperarUsuario } from './context/UsuarioActions'
import { carregarLegendas } from './context/SistemaActions'
import jwt from 'jsonwebtoken';


export default function LoginOuAplicacao() {

    const { dispatch, state } = useContext(GlobalContext)
    

    useEffect(() => {
        recuperarUsuario(dispatch);
        carregarLegendas(dispatch, "portugues");
    }, [dispatch]);
    
    let usuario = state.usuario;

    // Verificar se veio um Token para emitir um relatório
    const href = window.location.href;
    var tokenPos = href.search("/relatorio/");
    if (tokenPos >= 0) {
        tokenPos = tokenPos + 11;
        const token = href.substring(tokenPos);    
        jwt.verify(token, process.env.REACT_APP_API_KEY, (err) => {
            if (!err) {
                usuario = 'relatorio'
            }
        });
    }
  
    if (usuario) {
        return <App />
    } else {
        return <Login />
    } 
    
    
}
