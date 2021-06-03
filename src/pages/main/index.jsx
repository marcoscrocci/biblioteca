import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import firebase from 'firebase/app';
import FirebaseClient from '../../FirebaseClient'
import GlobalContext from '../../context/GlobalContext'
import { sairUsuario } from '../../context/UsuarioActions'
import Conteudo from '../../componentes/Conteudo'

export default function Main() {
    FirebaseClient();
    const { dispatch, state } = useContext(GlobalContext);
    const history = useHistory();

    const usuarioSair = () => {
        const usuario = firebase.auth();
        usuario.signOut();
        //history.push('/');
        sairUsuario(dispatch);
    }
    
    //console.log(state.usuario)

    return (
        <div>
            <Conteudo>
                <p>Principal</p>
                <button onClick={() => history.push('/testfirebase')}>Teste Firebase</button>
                <br />
                <button onClick={() => usuarioSair()}>Usuário - Sair</button>
                <br />

                <br />
                <br />
                {state.usuario.email}
            </Conteudo>
            
        </div>
    )
}

