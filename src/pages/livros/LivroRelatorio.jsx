import React, { useContext, useRef, useEffect } from 'react';
import GlobalContext from '../../context/GlobalContext';
import { listarLivros } from '../../context/LivroActions';
import Mensagem from '../../componentes/Mensagem';
import Linha from '../../componentes/Linha';
import Grade from '../../componentes/Grade';
import Loader from '../../componentes/Loader';
//import { useParams } from 'react-router-dom';


export default function LivroRelatorio({ match }) {
    const { dispatch, state } = useContext(GlobalContext);
    const mensagem = useRef();
    
    useEffect(() => {
        console.log('token =', match.params.token);
        
        listarLivros(dispatch, mensagem);
    }, [dispatch, match.params.token]);

    const montarRelatorio = () => {
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

        return gerarPaginas(lista);
    }

    const obterTitulos = () => {
        return (
            <tr>
                <th>Tombo</th>
                <th>Título</th>
                <th>Autor</th>
                <th>Editora</th>
            </tr>
        )
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

    const gerarPaginas = (lista) => {
        const paginas = [];
        let livros = lista;
        while (livros.length > 0) {
            const pagina = livros.splice(0, 24);
            paginas.push(pagina);
        }

        return paginas.map((pagina) => {
            const lista = pagina;
            return (
                <table>
                    <thead>
                        {obterTitulos()}
                    </thead>
                    <tbody>
                        {obterLinhas(lista)}
                    </tbody>
                </table>

            )
        });
    }



    return (
        <div>
            {(state.estaListandoLivros || state.estaSalvandoLivro) && <Loader />}
            <Linha>
                <Grade colunas="12">
                    {montarRelatorio()}
                </Grade>
            </Linha>
            <Mensagem ref={mensagem} />
        </div>
    )
}

