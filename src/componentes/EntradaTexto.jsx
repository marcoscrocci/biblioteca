import React from 'react'
//import { makeStyles } from '@material-ui/core/styles';
import { TextField, InputAdornment } from '@material-ui/core';
import Grade from './Grade'
import { entradaTextoEstilo } from '../estilos'


export default function EntradaTexto(props) {

    return (
        <Grade colunas={props.colunas}>
            <TextField
                id={props.id}
                name={props.nome}
                autoFocus={props.autoFocus}
                type={props.tipo}
                label={props.rotulo}
                onChange={props.onChange}
                value={props.valor ? props.valor : ''}
                required={props.requerido}
                variant="standard" // standard ou filled ou outlined
                disabled={props.desativado}
                autoComplete={props.autoCompletar === false && 'new-password'}
                
                //className="entradaTextoEstilo"
                style={ props.estilo ? props.estilo : entradaTextoEstilo }
                InputProps={{
                    endAdornment: <InputAdornment position="end">{props.posfixo}</InputAdornment>,
                    readOnly: props.somenteLeitura
                }}
                onBlur={props.onBlur}
            />

        </Grade>
    )
}

