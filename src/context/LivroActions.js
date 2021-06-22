import { mostrarMensagem } from '../Utils'
import Api from '../Api';


export const actions = {

    listandoLivros(state, action) {
        return {
            ...state,
            erroListandoLivros: false,
            estaListandoLivros: true
        }
    },

    livrosListados(state, action) {
        const livros = action.payload;
        return {
            ...state,
            erroListandoLivros: false,
            estaListandoLivros: false,
            livros
        }
    },

    livrosNaoListados(state, action) {
        return {
            ...state,
            erroListandoLivros: true,
            estaListandoLivros: false
        }
    },

    salvandoLivro(state, action) {
        return {
            ...state,
            erroSalvandoLivro: false,
            estaSalvandoLivro: true
        }
    },

    livroSalvo(state, action) {
        const mensagemComponente = action.payload;
        const msg = { mensagemComponente, mensagemObjeto: { tipo: 'success', texto: state.legenda.operacaoRealizadaComSucesso } }

        mostrarMensagem(msg, state);
        return {
            ...state,
            erroSalvandoLivro: false,
            estaSalvandoLivro: false
        }
    },

    livroNaoSalvo(state, action) {
        //console.log('mostrarMensagem =', action.payload);
        mostrarMensagem(action.payload, state);
        return {
            ...state,
            erroSalvandoLivro: true,
            estaSalvandoLivro: false
        }
    }

}

export const listarLivros = (dispatch, mensagemComponente) => {
    dispatch({ 
        type: 'listandoLivros'
    });

    Api.listarLivros()
    .then((listaLivros) => {   
        dispatch({ 
            type: 'livrosListados',
            payload: listaLivros
        });
    })
    .catch((error) => {
        console.log('erro =', JSON.stringify(error));
        //alert(`Código: ${error.code} - Mensagem: ${error.message}`);
        dispatch({
            type: 'livrosNaoListados',
            payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', codigo: error.code, texto: error.message } }
        });
    });
}

export const salvarLivro = (dispatch, livro, mensagemComponente) => {
    
    dispatch({
        type: 'salvandoLivro'
    });
    
    Api.salvarLivro(livro)
    .then((livroSalvo) => {
        dispatch({ 
            type: 'livroSalvo',
            payload: livroSalvo
        });
    })
    .catch((error) => {
        console.log('erro =', JSON.stringify(error));
        //alert(`Código: ${error.code} - Mensagem: ${error.message}`);
        dispatch({
            type: 'livroNaoSalvo',
            payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', codigo: error.code, texto: error.message } }
        });
    });

}