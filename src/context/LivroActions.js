import { mostrarMensagem } from '../Utils'
import Api from '../Api';


export const actions = {

    listando(state, action) {
        return {
            ...state,
            erroListando: false,
            estaListando: true
        }
    },

    listados(state, action) {
        return {
            ...state,
            erroListando: false,
            estaListando: false,
            livros: action.payload
        }
    },

    naoListados(state, action) {
        return {
            ...state,
            erroListando: true,
            estaListando: false
        }
    },

    salvando(state, action) {
        return {
            ...state,
            erroSalvando: false,
            estaSalvando: true
        }
    },

    salvo(state, action) {
        const mensagemComponente = action.payload;
        const msg = { mensagemComponente, mensagemObjeto: { tipo: 'success', texto: state.legenda.operacaoRealizadaComSucesso } }

        mostrarMensagem(msg, state);
        return {
            ...state,
            erroSalvando: false,
            estaSalvando: false
        }
    },

    naoSalvo(state, action) {
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
        type: 'listando'
    });

    Api.listarLivros()
    .then((lista) => {   
        dispatch({ 
            type: 'listados',
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
    
    Api.salvarLivro(objeto)
    .then((salvo) => {
        dispatch({ 
            type: 'salvo',
            payload: objeto
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