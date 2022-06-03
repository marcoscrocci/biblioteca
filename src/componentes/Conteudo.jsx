import React from "react";
import Browser from './Browser'
import Mobile from './Mobile'
import { isMobile } from 'react-device-detect'

export default function Conteudo(props) {
    document.body.style.zoom = "100%";

    if (isMobile) {
        return <Mobile>{props.children}</Mobile>
    } else {
        return <Browser>{props.children}</Browser>        
    }
}
