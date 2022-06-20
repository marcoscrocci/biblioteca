import React, { useContext, useEffect, useRef } from "react";
import Lista from "../../componentes/Lista";
import GlobalContext from '../../context/GlobalContext';
import { listar } from '../../context/AutorActions';
import Mensagem from '../../componentes/Mensagem';
import AutorForm from './AutorForm';

function AutorLista() {
    const { dispatch, state } = useContext(GlobalContext);
    const mensagem = useRef();
    const formAutor = useRef();
    const tabColunas = [
        { title: state.legenda.nome, field: 'nome' },
        { title: state.legenda.wikipedia, field: 'wikipedia' }
    ]
    const autor = {
        id: null,
        nome: null,
        wikipedia: null,
        ativo: true
    }

    useEffect(() => {
        document.title = `${state.legenda.nomeAplicativo} - ${state.legenda.autoresTitulo}`;
        if (!state.estaSalvando) {
            listar(dispatch, mensagem, state.legenda);
        }
    }, [state.legenda.nomeAplicativo, state.legenda.autoresTitulo, dispatch, state.estaSalvando, state.legenda]);

    const adicionar = () => {
        formAutor.current.abrirAutorForm(autor);
    }

    const editar = (rowData) => {
        const autor = {
            id: rowData.id,
            nome: rowData.nome,
            wikipedia: rowData.wikipedia,
            ativo: rowData.ativo
        }
        formAutor.current.abrirAutorForm(autor);
    }

    const excluir = (rowData) => {
        var autor = {
            id: rowData.id,
            nome: rowData.nome,
            wikipedia: rowData.wikipedia,
            ativo: false
        }
        formAutor.current.abrirAutorForm(autor);
    }

    return (
        <div>
            <Lista
                titulo={state.legenda.autoresTitulo}
                tabColunas={tabColunas}
                dados={state.autores}
                listar={listar}
                objeto={autor}
                adicionar={adicionar}
                editar={editar}
                excluir={excluir}
            />
            <AutorForm ref={formAutor} />
            <Mensagem ref={mensagem} />
        </div>
    );
}

export default AutorLista;
