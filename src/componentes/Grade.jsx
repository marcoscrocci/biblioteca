import React from 'react'

export default function Grade(props) {
    function toCssClasses(numeros) {
        const colunas = numeros ? numeros.split(" ") : [];
        let classes = "";
        
        if (colunas[0]) classes += `col-xs-${colunas[0]}`;
        
        if (colunas[1]) { 
            classes += ` col-sm-${colunas[1]}` 
        } else { 
            classes += ` col-sm-${colunas[0]}` 
        };
        
        if (colunas[2]) {
            classes += ` col-md-${colunas[2]}`;
        } else {
            classes += ` col-md-${colunas[0]}`;
        }
        
        if (colunas[3]) {
            classes += ` col-lg-${colunas[3]}`;
        } else {
            classes += ` col-lg-${colunas[0]}`;
        }
        
        return classes;
    }

    const gradeClasses = toCssClasses(props.colunas || "12");

    return (
        //<div className='col-xs-2 col-sm-4 col-md-6 col-lg-12'>        
        <div className={gradeClasses}>
            {props.children}
        </div>
    )
}
