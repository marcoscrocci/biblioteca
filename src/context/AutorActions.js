import Api from '../Api';
import { actions as globalActions } from './GlobalActions';

export const actions = {

    ...globalActions,
    // listandoAutores(state, action) {
    //     return {
    //         ...state,
    //         erroListando: false,
    //         estaListando: true
    //     }
    // },

    autoresListados(state, action) {
        return {
            ...state,
            erroListando: false,
            estaListando: false,
            autores: action.payload
        }
    },

    // autoresNaoListados(state, action) {
    //     return {
    //         ...state,
    //         erroListando: true,
    //         estaListando: false
    //     }
    // },

    // salvandoAutor(state, action) {
    //     return {
    //         ...state,
    //         erroSalvando: false,
    //         estaSalvando: true
    //     }
    // },

    // autorSalvo(state, action) {
    //     const mensagemComponente = action.payload;
    //     const msg = { mensagemComponente, mensagemObjeto: { tipo: 'success', texto: state.legenda.operacaoRealizadaComSucesso } }

    //     mostrarMensagem(msg, state);
    //     return {
    //         ...state,
    //         erroSalvando: false,
    //         estaSalvando: false
    //     }
    // },

    // autorNaoSalvo(state, action) {
    //     //console.log('mostrarMensagem =', action.payload);
    //     mostrarMensagem(action.payload, state);
    //     return {
    //         ...state,
    //         erroSalvando: true,
    //         estaSalvando: false
    //     }
    // }

}

export const listar = (dispatch, mensagemComponente) => {
    dispatch({ 
        type: 'listando'
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
            type: 'naoListados',
            payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', codigo: error.code, texto: error.message } }
        });
    });
}

export const salvar = (dispatch, objeto, mensagemComponente) => {
    
    dispatch({
        type: 'salvando'
    });
    
    Api.salvarAutor(objeto)
    .then((salvo) => {
        dispatch({ 
            type: 'salvo',
            payload: mensagemComponente
        });
    })
    .catch((error) => {
        console.log('erro =', JSON.stringify(error));
        //alert(`Código: ${error.code} - Mensagem: ${error.message}`);
        dispatch({
            type: 'naoSalvo',
            payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', codigo: error.code, texto: error.message } }
        });
    });

}