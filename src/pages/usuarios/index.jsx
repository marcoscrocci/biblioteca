import React, { useContext, useRef } from 'react';
//import { useHistory } from "react-router-dom";
//import firebase from 'firebase/app';
import FirebaseClient from '../../FirebaseClient';
import GlobalContext from '../../context/GlobalContext';
import { registrarUsuario } from '../../context/UsuarioActions';
import Conteudo from '../../componentes/Conteudo';
import Mensagem from '../../componentes/Mensagem';


export default function Main() {
    FirebaseClient();
    const { dispatch } = useContext(GlobalContext);
    //const history = useHistory();
    const mensagem = useRef();

    const incluirUsuario = () => {
        const usuario = {
            nome: 'Teste',
            email: 'teste@gmail.com',
            senha: 'secret@1'
        }
        registrarUsuario(dispatch, usuario, mensagem);
    }

    return (
        <div>
            <Conteudo>
                <p>Usuários</p>

                <br />
                <button onClick={() => incluirUsuario()}>Registrar Usuário</button>
            </Conteudo>
            <Mensagem ref={mensagem} />
        </div>
    )
}

