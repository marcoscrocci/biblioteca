import React, { useContext } from 'react'
import App from './App'
//import GlobalContext from './context/GlobalContext'
import Login from './pages/login'
import firebase from 'firebase/app';
import FirebaseClient from './FirebaseClient'


export default function LoginOuAplicacao(props) {
    FirebaseClient();

    const obterUsuario = () => {
        const usuarioFirebase = firebase.auth();
        return usuarioFirebase.currentUser;
    }
    
    //const { state, dispatch } = useContext(GlobalContext)
    const usuario = obterUsuario();
    console.log(usuario)

    if (usuario) {
        console.log(usuario)
        return <App />
    } else {
        console.log('login')
        return <Login />
    } 
    
    
}
