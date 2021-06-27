import React, { useContext, useEffect } from 'react'
import App from './App'
import GlobalContext from './context/GlobalContext'
import Login from './pages/login'
import { recuperarUsuario } from './context/UsuarioActions'
import { carregarLegendas } from './context/SistemaActions'


export default function LoginOuAplicacao() {

    const { dispatch, state } = useContext(GlobalContext)
    

    useEffect(() => {
        recuperarUsuario(dispatch);
        carregarLegendas(dispatch, "portugues");
    }, [dispatch]);
    
  
    if (state.usuario || true) {
        return <App />
    } else {
        return <Login />
    } 
    
    
}
