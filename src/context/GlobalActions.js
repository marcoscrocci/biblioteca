import { mostrarMensagem } from '../Utils'

export const actions = {

    listando(state, action) {
        return {
            ...state,
            erroListando: false,
            estaListando: true
        }
    },

    // listados(state, action) {
    //     return {
    //         ...state,
    //         erroListando: false,
    //         estaListando: false,
    //         livros: action.payload
    //     }
    // },

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