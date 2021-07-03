import React, { useContext, useRef, useEffect } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { listarLivros } from '../../context/LivroActions';
import Conteudo from '../../componentes/Conteudo';
import Mensagem from '../../componentes/Mensagem';
import b64 from 'base-64';
import Linha from '../../componentes/Linha'
import Grade from '../../componentes/Grade'
import MaterialTable from 'material-table'
import LivroForm from './LivroForm'
import Loader from '../../componentes/Loader'
import { localization, materiaTableOptions } from '../../estilos'
import { Edit, Delete, Add, Refresh, Print } from '@material-ui/icons'
import jwt from 'jsonwebtoken';


export default function LivroLista() {
    const { dispatch, state } = useContext(GlobalContext);
    const formLivro = useRef();
    const mensagem = useRef();

    const tabColunas = [
        //{ title: state.legenda.codigo, field: 'id' },
        { title: state.legenda.tombo, field: 'tombo' },
        { title: state.legenda.tombofim, field: 'tombofim' },
        { title: state.legenda.titulo, field: 'titulo' },
        { title: state.legenda.autor, field: 'autor' },
        { title: state.legenda.editora, field: 'editora' }
    ]

    useEffect(() => {
        document.title = `${state.legenda.nomeAplicativo} - ${state.legenda.livrosTitulo}`
        if (!state.estaSalvandoLivro) {
            listarLivros(dispatch, mensagem, state.legenda);
        }
    }, [state.estaSalvandoLivro, dispatch, state.legenda.nomeAplicativo, state.legenda.livrosTitulo, state.legenda]);


    const atualizar = () => {
        //alert('atualizar')
        listarLivros(dispatch, mensagem, state.legenda);
    }

    const adicionar = () => {
        var livro = {
            id: null,
            tombo: null,
            tombofim: null,
            titulo: null,
            autor: null,
            editora: null,
            ativo: true
        };
        formLivro.current.abrirLivroForm(livro);
    }


    const editar = (event, rowData) => {
        var livro = {
            id: rowData.id,
            tombo: rowData.tombo,
            tombofim: rowData.tombofim,
            titulo: rowData.titulo,
            autor: rowData.autor,
            editora: rowData.editora,
            ativo: rowData.ativo
        }

        formLivro.current.abrirLivroForm(livro);
    }

    const excluir = (event, rowData) => {
        var livro = {
            id: rowData.id,
            tombo: rowData.tombo,
            tombofim: rowData.tombofim,
            titulo: rowData.titulo,
            autor: rowData.autor,
            editora: rowData.editora,
            ativo: false
        }

        formLivro.current.abrirLivroForm(livro);
    }

    const imprimir = (event, rowData) => {
        var token = jwt.sign({ id: state.usuario.id }, process.env.REACT_APP_API_KEY, {
            expiresIn: 30 // expires in 30 segundos
        });

        const urlServer = window.location.href;
        //console.log(urlServer);

        const url = `${urlServer}/relatorio/${token}`;

        const pagina = {
            //id: state.usuario.id,
            //token,
            url,
            waitUntil: "networkidle2",
            pdf: {
                printBackground: true,
                format: "A4",
                margin: { top: "1.9cm", left: "1.2cm", right: "1.2cm", bottom: "1.8cm" },
                landscape: true
            }
        }
        const parametros = b64.encode(JSON.stringify(pagina));

        //alert('parametros:' + parametros);
        const urlGerarPdf = process.env.REACT_APP_GERAR_PDF_URL;

        var relatorio = window.open(`${urlGerarPdf}/${parametros}`, '_blank');
        relatorio.focus();
    }


    return (
        <div>
            {(state.estaListandoLivros || state.estaSalvandoLivro) && <Loader />}
            <Conteudo>
                <Linha>
                    <Grade colunas="12">
                        <MaterialTable
                            title={state.legenda.livrosTituloLista}
                            columns={tabColunas}
                            localization={localization}
                            data={state.livros}
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
                                },
                                {
                                    icon: () => <Print color="primary" />,
                                    tooltip: state.legenda.imprimir,
                                    isFreeAction: true,
                                    onClick: imprimir
                                }
                            ]}
                        />
                    </Grade>
                </Linha>
                <LivroForm
                    ref={formLivro}
                />
                <Mensagem ref={mensagem} />
            </Conteudo>
        </div>
    )
}

