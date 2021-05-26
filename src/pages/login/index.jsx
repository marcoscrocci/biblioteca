import React from 'react'
import firebase from 'firebase/app';
import FirebaseClient from '../../FirebaseClient'

export default function Login() {
    FirebaseClient();


    const autenticarUsuario = () => {
        var email = "curso.firebase@gmail.com";
        var senha = "secret12345";
        const usuario = firebase.auth();
        usuario.signInWithEmailAndPassword(email, senha)
            .then(() => {
                alert("Usuário autenticado com sucesso!");
            })
            .catch((error) => {
                alert(`Código: ${error.code} - Mensagem: ${error.message}`);
            });
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
            <button onClick={() => autenticarUsuario()}>Usuário - Autenticar</button>
            <br />
            <button onClick={() => verificarUsuarioAutenticado()}>Verificar Usuário Autenticado</button>
        </div>
    )


}