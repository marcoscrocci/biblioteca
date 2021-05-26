import React from 'react'

// Linha "Sem Estilo" - Sem o container-fluid
export default function Linha(props) {
    return (
        <div className='content'>        
            <div className='row'>
                {props.children}
            </div>
        </div>
    )
}
