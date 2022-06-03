import React, { useContext, useEffect } from "react";
import Lista from "../../componentes/Lista";
import GlobalContext from '../../context/GlobalContext';

function AutorLista() {
    const { state } = useContext(GlobalContext);
    const tabColunas = [
        { title: state.legenda.autor, field: 'autor' },
    ]

    useEffect(() => {
        document.title = `${state.legenda.nomeAplicativo} - ${state.legenda.autoresTitulo}`;        
    }, [state.legenda.nomeAplicativo, state.legenda.autoresTitulo]);

    return (
        <div>
            <Lista tabColunas={tabColunas}>
                <div>AutorLista</div>
            </Lista>
        </div>
    );
}

export default AutorLista;
