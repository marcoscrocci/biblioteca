import React, { useContext, useRef, useEffect, useState } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { /*registrarUsuario,*/ listarUsuarios } from '../../context/UsuarioActions';
import Conteudo from '../../componentes/Conteudo';
import Mensagem from '../../componentes/Mensagem';

//import ConteudoTitulo from '../../componentes/TituloConteudo'
import Linha from '../../componentes/Linha'
import Grade from '../../componentes/Grade'
import MaterialTable from 'material-table'
import UsuarioForm from './UsuarioForm'
import Loader from '../../componentes/Loader'
import { localization, materiaTableOptions } from '../../estilos'
import { Edit, Delete, Add, Refresh } from '@material-ui/icons'
import { objetosParaLista } from '../../Utils';

export default function Main() {
    const { dispatch, state } = useContext(GlobalContext);
    const formUsuario = useRef();
    //const history = useHistory();
    const mensagem = useRef();
    const [Usuarios, setUsuarios] = useState([]);

    const tabColunas = [
        { title: state.legenda.codigo, field: 'id' },
        { title: state.legenda.nome, field: 'nome' },
        { title: state.legenda.email, field: 'email' }
    ]

    useEffect(() => {
        document.title = `${state.legenda.nomeAplicativo} - ${state.legenda.usuariosTitulo}`
        if (!state.estaRegistrandoUsuario) {
            listarUsuarios(dispatch, mensagem);
        }
    }, [state.estaRegistrandoUsuario, dispatch, state.legenda.nomeAplicativo, state.legenda.usuariosTitulo]);

    useEffect(() => {
        setUsuarios(objetosParaLista(state.usuarios));
    }, [state.usuarios]);

    // const incluirUsuario = () => {
    //     const usuario = {
    //         nome: 'Teste',
    //         email: 'teste@gmail.com',
    //         senha: 'secret@1'
    //     }
    //     registrarUsuario(dispatch, usuario, mensagem);
    // }

    const atualizar = () => {
        alert('atualizar')
        listarUsuarios(dispatch, mensagem)
    }

    const adicionar = () => {
        //alert('adicionar');
        var usuario = {
            ativo: 1
        };
        formUsuario.current.abrirUsuarioForm(usuario)
    }


    const editar = (event, rowData) => {
        var usuario = {
            id: rowData.id,
            nome: rowData.nome,
            email: rowData.email,
            ativo: rowData.ativo
        }
        const sUsuario = JSON.stringify(usuario);
        //alert(sUsuario);
        console.log(sUsuario);
        formUsuario.current.abrirUsuarioForm(usuario);
    }

    const excluir = (event, rowData) => {
        alert('Excluir');
        // var usuario = {
        //     UsuarioID: rowData.UsuarioID,
        //     Nome: rowData.Nome,
        //     Login: rowData.Login,
        //     Senha: rowData.Senha,
        //     Matricula: rowData.Matricula,
        //     SegundosAtualizar: rowData.SegundosAtualizar,
        //     UsuarioGrupos: rowData.UsuarioGrupos
        // }
        // formUsuario.current.abrirUsuarioForm(usuario, false)
    }

    // const dados = () => {
    //     if (state.usuarios) {
    //         const usuarios = state.usuarios;
            
    //         const lista = Object.keys(usuarios).map(id => {
    //             let usuario = usuarios[id];
    //             usuario.id = id;
    //             return usuario
    //         });
    
    //         //console.log(JSON.stringify(lista));
        
    //         return lista;
    //     }

    //     return [];
    // }


    return (
        <div>
            {(state.estaListandoUsuarios || state.estaSalvandoUsuario) && <Loader />}
            <Conteudo>
                {/* <ConteudoTitulo
                    titulo={state.legenda.usuariosTitulo}
                    textoBotao={state.legenda.Adicionar}
                    botaoAtualizarClick={atualizar}
                    botaoAdicionarClick={adicionar}
                /> */}
                <Linha>
                    <Grade colunas="12">
                        <MaterialTable
                            title={state.legenda.usuariosTituloLista}
                            columns={tabColunas}
                            localization={localization}
                            data={Usuarios}
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

