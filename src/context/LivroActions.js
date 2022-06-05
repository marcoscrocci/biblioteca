import { mostrarMensagem } from '../Utils'
import Api from '../Api';


export const actions = {

    listandoLivros(state, action) {
        return {
            ...state,
            erroListando: false,
            estaListando: true
        }
    },

    livroslistados(state, action) {
        return {
            ...state,
            erroListando: false,
            estaListando: false,
            livros: action.payload
        }
    },

    livrosNaoListados(state, action) {
        return {
            ...state,
            erroListando: true,
            estaListando: false
        }
    },

    salvandoLivro(state, action) {
        return {
            ...state,
            erroSalvando: false,
            estaSalvando: true
        }
    },

    livroSalvo(state, action) {
        const mensagemComponente = action.payload;
        const msg = { mensagemComponente, mensagemObjeto: { tipo: 'success', texto: state.legenda.operacaoRealizadaComSucesso } }

        mostrarMensagem(msg, state);
        return {
            ...state,
            erroSalvando: false,
            estaSalvando: false
        }
    },

    livroNaoSalvo(state, action) {
        //console.log('mostrarMensagem =', action.payload);
        mostrarMensagem(action.payload, state);
        return {
            ...state,
            erroSalvando: true,
            estaSalvando: false
        }
    }

}

export const listar = (dispatch, mensagemComponente) => {
    dispatch({ 
        type: 'listandoLivros'
    });

    Api.listar('livros')
    .then((lista) => {   
        dispatch({ 
            type: 'livroslistados',
            payload: lista
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

export const salvar = (dispatch, objeto, mensagemComponente) => {
    
    dispatch({
        type: 'salvando'
    });
    
    Api.salvarLivro(objeto)
    .then((salvo) => {
        dispatch({ 
            type: 'livrosSalvo',
            payload: objeto
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