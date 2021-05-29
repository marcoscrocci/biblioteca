import React, { useContext, useEffect } from 'react'
import App from './App'
import GlobalContext from './context/GlobalContext'
import Login from './pages/login'
import { recuperarUsuario } from './context/UsuarioActions'



export default function LoginOuAplicacao() {

    const { dispatch, state } = useContext(GlobalContext)
    

    useEffect(() => {
        recuperarUsuario(dispatch);
    }, [dispatch]);
    
  
    if (state.usuario) {
        return <App />
    } else {
        return <Login />
    } 
    
    
}
