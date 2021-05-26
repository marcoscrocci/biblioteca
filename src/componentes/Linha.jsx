import React from 'react'

export default function Linha(props) {
    return (
        <div className='content'>
             <div className='container-fluid'>
                <div className='row'>
                    {props.children}
                </div>
             </div>
        </div>
    )
}
