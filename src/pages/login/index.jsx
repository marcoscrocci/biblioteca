import React, { useContext } from 'react'
import { autenticarUsuario } from '../../context/UsuarioActions'
import GlobalContext from '../../context/GlobalContext'
import firebase from 'firebase/app';
import FirebaseClient from '../../FirebaseClient'

export default function Login() {
    FirebaseClient();
    const { dispatch } = useContext(GlobalContext);


    const entrar = () => {
        var email = "curso.firebase@gmail.com";
        var senha = "secret12345";
        
        autenticarUsuario(dispatch, email, senha);
        
    }

    const verificarUsuarioAutenticado = () => {
        const usuario = firebase.auth();
        const usuarioAtual = usuario.currentUser;
        if (usuarioAtual) {
            alert(JSON.stringify(usuarioAtual));
        } else {
            alert("Não há usuários autenticados no Firebase!");
        }
    }


    return(
        <div>
            Login
            <br />
            <button onClick={() => entrar()}>Usuário - Autenticar</button>
            <br />
            <button onClick={() => verificarUsuarioAutenticado()}>Verificar Usuário Autenticado</button>

        </div>
    )


}