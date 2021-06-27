import React, { useContext, useRef, useEffect } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { listarLivros } from '../../context/LivroActions';
import Mensagem from '../../componentes/Mensagem';
import Linha from '../../componentes/Linha'
import Grade from '../../componentes/Grade'
import Loader from '../../componentes/Loader'



export default function LivroRelatorio() {
    const { dispatch, state } = useContext(GlobalContext);
    const mensagem = useRef();

    useEffect(() => {
        listarLivros(dispatch, mensagem);
    }, [dispatch]);

    const montarLista = () => {
        const mostrarTitulos = true;
        let livros = state.livros || [];
        let lista = [];
        
        for (let i = 0; i < livros.length; i++) {
            const item = livros[i];
            for (let t = item.tombo; t < item.tombofim; t++) {
               const livro = {
                    tombo: t,
                    titulo: item.titulo,
                    autor: item.autor,
                    editora: item.editora
               }
               lista.push(livro);
            }            
        }

        lista = lista.sort((a, b) => a.tombo - b.tombo);

        return gerarPaginas(lista, mostrarTitulos, 24);
    }

    const obterTitulos = (mostrarTitulos) => {
        if (mostrarTitulos) {
            return (
                <tr>
                    <th>Tombo</th>
                    <th>Título</th>
                    <th>Autor</th>
                    <th>Editora</th>
                </tr>
            )
        }
    }


    const obterLinhas = (lista) => {
        return lista.map((linha, index) => {
            return (     
                <tr key={index}>
                    <td>{linha.tombo}</td>
                    <td>{linha.titulo}</td>
                    <td>{linha.autor}</td>
                    <td>{linha.editora}</td>
                </tr>
            )
        });
    }

    const gerarPaginas = (lista, mostrarTitulos) => {
        const linhasPorPagina = 24;
        let livros = lista.splice(0, linhasPorPagina);
        
        let html = (
            <table>
                {obterTitulos(mostrarTitulos)}
                {obterLinhas(livros)}
            </table>
        );        

        return html;
    }



    return (
        <div>
            {(state.estaListandoLivros || state.estaSalvandoLivro) && <Loader />}
            <Linha>
                <Grade colunas="12">
                    {montarLista()}
                </Grade>
            </Linha>
            <Mensagem ref={mensagem} />
        </div>
    )
}

