//import React, { useContext, useEffect } from 'react';
import Browser from './Browser'
import Mobile from './Mobile'
import { isMobile } from 'react-device-detect'
//import GlobalContext from '../context/GlobalContext'
//import { temAcesso } from '../Utils'
//import { sairUsuario } from '../context/UsuarioActions'
//import { useHistory } from "react-router-dom";

export default function Conteudo(props) {
    //const { state, dispatch } = useContext(GlobalContext)
    //const history = useHistory();
    document.body.style.zoom = "100%";

    // useEffect(() => {
    //     if (props.caminho) {
    //         temAcesso(props.caminho, state, dispatch, history, sairUsuario)
    //     }
    // }, [])

    if (isMobile) {
        return <Mobile>{props.children}</Mobile>
    } else {
        return <Browser>{props.children}</Browser>        
    }
}
