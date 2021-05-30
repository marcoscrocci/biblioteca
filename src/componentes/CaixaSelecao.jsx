import React from 'react'
import { FormControlLabel, Checkbox } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import Zoom from '@material-ui/core/Zoom';
import { tooltipTitle } from '../estilos'
import Grade from './Grade'

export default function CaixaSelecao(props) {
    let dica = (typeof(props.dica) !== "undefined") && props.dica && props.dica.trim() !== '' ? props.dica.trim() : '';
    if (dica) {
        dica = <div style={tooltipTitle}>{dica}</div>
    }
    return (
        <Grade colunas={props.colunas}>
            <Tooltip title={dica} arrow={true} TransitionComponent={Zoom}> 
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={props.marcado}
                            onChange={props.onChange}
                            name={props.nome}
                            color={props.cor ? props.cor : 'primary'}
                        />
                    }
                    label={props.rotulo}
                />          
            </Tooltip>
        </Grade>
    )
}
