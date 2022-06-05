import React, { useContext, useEffect, useRef } from "react";
import Lista from "../../componentes/Lista";
import GlobalContext from '../../context/GlobalContext';
import { listar } from '../../context/AutorActions';
import Mensagem from '../../componentes/Mensagem';

function AutorLista() {
    const { dispatch, state } = useContext(GlobalContext);
    const mensagem = useRef();
    const tabColunas = [
        { title: state.legenda.nome, field: 'nome' },
        { title: state.legenda.wikipedia, field: 'wikipedia' }
    ]

    useEffect(() => {
        document.title = `${state.legenda.nomeAplicativo} - ${state.legenda.autoresTitulo}`;
        if (!state.estaSalvando) {
            listar(dispatch, mensagem, state.legenda);
        }
    }, [state.legenda.nomeAplicativo, state.legenda.autoresTitulo, dispatch, state.estaSalvando, state.legenda]);

    return (
        <div>
            <Lista
                titulo={state.legenda.autoresTitulo}
                tabColunas={tabColunas}
                dados={state.autores}
                listar={listar}
            />
            <Mensagem ref={mensagem} />
        </div>
    );
}

export default AutorLista;
