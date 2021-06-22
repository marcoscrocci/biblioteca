import React, { useContext, useRef, useEffect } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { listarUsuarios } from '../../context/UsuarioActions';
import Conteudo from '../../componentes/Conteudo';
import Mensagem from '../../componentes/Mensagem';

import Linha from '../../componentes/Linha'
import Grade from '../../componentes/Grade'
import MaterialTable from 'material-table'
import UsuarioForm from './UsuarioForm'
import Loader from '../../componentes/Loader'
import { localization, materiaTableOptions } from '../../estilos'
import { Edit, Delete, Add, Refresh } from '@material-ui/icons'


export default function Main() {
    const { dispatch, state } = useContext(GlobalContext);
    const formUsuario = useRef();
    const mensagem = useRef();


    const tabColunas = [
        { title: state.legenda.codigo, field: 'id' },
        { title: state.legenda.nome, field: 'nome' },
        { title: state.legenda.email, field: 'email' },
        { title: state.legenda.administrador, field: 'administradorLegenda' }
    ]

    useEffect(() => {
        document.title = `${state.legenda.nomeAplicativo} - ${state.legenda.usuariosTitulo}`
        if (!state.estaSalvandoUsuario) {
            listarUsuarios(dispatch, mensagem, state.legenda);
        }
    }, [state.estaSalvandoUsuario, dispatch, state.legenda.nomeAplicativo, state.legenda.usuariosTitulo, state.legenda]);


    const atualizar = () => {
        //alert('atualizar')
        listarUsuarios(dispatch, mensagem, state.legenda);
    }

    const adicionar = () => {
        var usuario = {
            id: null,
            nome: null,
            email: null,
            administrador: false,
            ativo: true
        };
        formUsuario.current.abrirUsuarioForm(usuario)
    }


    const editar = (event, rowData) => {
        var usuario = {
            id: rowData.id,
            nome: rowData.nome,
            email: rowData.email,
            administrador: rowData.administrador,
            ativo: rowData.ativo
        }

        formUsuario.current.abrirUsuarioForm(usuario);
    }

    const excluir = (event, rowData) => {
        var usuario = {
            id: rowData.id,
            nome: rowData.nome,
            email: rowData.email,
            administrador: rowData.administrador,
            ativo: false
        }

        formUsuario.current.abrirUsuarioForm(usuario);
    }


    return (
        <div>
            {(state.estaListandoUsuarios || state.estaSalvandoUsuario) && <Loader />}
            <Conteudo>
                <Linha>
                    <Grade colunas="12">
                        <MaterialTable
                            title={state.legenda.usuariosTituloLista}
                            columns={tabColunas}
                            localization={localization}
                            data={state.usuarios}
                            options={materiaTableOptions}
                            actions={[
                                {
                                    icon: () => <Edit color="primary" />,
                                    tooltip: 'Editar',
                                    onClick: editar
                                },
                                {
                                    icon: () => <Delete color="secondary" />,
                                    tooltip: 'Excluir',
                                    onClick: excluir
                                },
                                {
                                    icon: () => <Add color="primary" />,
                                    tooltip: state.legenda.adicionar,
                                    isFreeAction: true,
                                    onClick: adicionar
                                },
                                {
                                    icon: () => <Refresh color="primary" />,
                                    tooltip: state.legenda.atualizar,
                                    isFreeAction: true,
                                    onClick: atualizar
                                }
                            ]}
                        />
                    </Grade>
                </Linha>
                <UsuarioForm
                    ref={formUsuario}
                />
                <Mensagem ref={mensagem} />
            </Conteudo>
        </div>
    )
}

