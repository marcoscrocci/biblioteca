import { mostrarMensagem } from '../Utils'
import Api from '../Api';


export const actions = {

    listandoAutores(state, action) {
        return {
            ...state,
            erroListando: false,
            estaListando: true
        }
    },

    autoresListados(state, action) {
        return {
            ...state,
            erroListando: false,
            estaListando: false,
            autores: action.payload
        }
    },

    autoresNaoListados(state, action) {
        return {
            ...state,
            erroListando: true,
            estaListando: false
        }
    },

    salvandoAutor(state, action) {
        return {
            ...state,
            erroSalvando: false,
            estaSalvando: true
        }
    },

    autorSalvo(state, action) {
        const mensagemComponente = action.payload;
        const msg = { mensagemComponente, mensagemObjeto: { tipo: 'success', texto: state.legenda.operacaoRealizadaComSucesso } }

        mostrarMensagem(msg, state);
        return {
            ...state,
            erroSalvando: false,
            estaSalvando: false
        }
    },

    autorNaoSalvo(state, action) {
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
        type: 'listandoAutores'
    });
    
    Api.listar('autores')
    .then((lista) => {
        dispatch({ 
            type: 'autoresListados',
            payload: lista
        });
    })
    .catch((error) => {
        console.log('erro =', JSON.stringify(error));
        //alert(`Código: ${error.code} - Mensagem: ${error.message}`);
        dispatch({
            type: 'autoresNaoListados',
            payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', codigo: error.code, texto: error.message } }
        });
    });
}

export const salvar = (dispatch, objeto, mensagemComponente) => {
    
    dispatch({
        type: 'salvandoAutor'
    });
    
    Api.salvarAutor(objeto)
    .then((salvo) => {
        dispatch({ 
            type: 'autorSalvo',
            payload: objeto
        });
    })
    .catch((error) => {
        console.log('erro =', JSON.stringify(error));
        //alert(`Código: ${error.code} - Mensagem: ${error.message}`);
        dispatch({
            type: 'autorNaoSalvo',
            payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', codigo: error.code, texto: error.message } }
        });
    });

}