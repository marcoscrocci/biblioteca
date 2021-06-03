import React, { useContext } from 'react';
//import { useHistory } from "react-router-dom";
//import firebase from 'firebase/app';
import FirebaseClient from '../../FirebaseClient'
import GlobalContext from '../../context/GlobalContext'
//import { sairUsuario } from '../../context/UsuarioActions'
import Conteudo from '../../componentes/Conteudo'

export default function Main() {
    FirebaseClient();
    const { dispatch, state } = useContext(GlobalContext);
    //const history = useHistory();

    return (
        <div>
            <Conteudo>
                <p>Livros</p>
            </Conteudo>
            
        </div>
    )
}

