import React from 'react';
import { Button } from '@material-ui/core';
import { botaoEstilo } from '../estilos'

export default function Botao(props) {

    const aoClicar = () => {
        props.aoClicar && props.aoClicar();
    }

    return (
        <Button
            type={props.tipo}
            color={props.cor || "primary"}
            variant={props.variante || "contained"}
            estilo={props.estilo || botaoEstilo}
            onClick={aoClicar}
        >
            {props.texto || "Sem Texto"}
        </Button>
    )
}