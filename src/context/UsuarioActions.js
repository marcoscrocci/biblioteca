//import firebase from 'firebase/app';
//import FirebaseClient from './../FirebaseClient'
import { guardar, recuperar, remover, mostrarMensagem } from '../Utils'
//import b64 from 'base-64';
import Api from '../Api';

export const actions = {

    autenticandoUsuario(state, action) {
        return {
            ...state,
            erroAutenticandoUsuario: false,
            estaAutenticandoUsuario: true
        }
    },

    usuarioAutenticado(state, action) {
        const usuario = action.payload
        //console.log('state -> usuario =', usuario);
        
        return { 
            ...state,
            erroAutenticandoUsuario: false,
            estaAutenticandoUsuario: false,
            usuario
        }
    },

    usuarioNaoAutenticado(state, action) {
        //console.log('mostrarMensagem =', action.payload);
        mostrarMensagem(action.payload, state);
        return {
            ...state,
            erroAutenticandoUsuario: true,
            estaAutenticandoUsuario: false
        }
    },

    sairUsuario(state, action) {
        return {
            ...state,
            usuario: null,
            token: null
            //menu: null
        }
    },

    salvandoUsuario(state, action) {
        return {
            ...state,
            erroSalvandoUsuario: false,
            estaSalvandoUsuario: true
        }
    },

    usuarioSalvo(state, action) {
        const mensagemComponente = action.payload;
        const msg = { mensagemComponente, mensagemObjeto: { tipo: 'success', texto: state.legenda.operacaoRealizadaComSucesso } }

        mostrarMensagem(msg, state);
        return {
            ...state,
            erroSalvandoUsuario: false,
            estaSalvandoUsuario: false
        }
    },

    usuarioNaoSalvo(state, action) {
        //console.log('mostrarMensagem =', action.payload);
        mostrarMensagem(action.payload, state);
        return {
            ...state,
            erroSalvandoUsuario: true,
            estaSalvandoUsuario: false
        }
    },

    listandoUsuarios(state, action) {
        return {
            ...state,
            erroListandoUsuarios: false,
            estaListandoUsuarios: true
        }
    },

    usuariosListados(state, action) {
        const usuarios = action.payload;
        return {
            ...state,
            erroListandoUsuarios: false,
            estaListandoUsuarios: false,
            usuarios
        }
    },

    usuariosNaoListados(state, action) {
        return {
            ...state,
            erroListandoUsuarios: true,
            estaListandoUsuarios: false
        }
    }

}


export const autenticarUsuario = async (dispatch, usuario, mensagemComponente) => {
    try {
        //console.log('autenticarUsuario - email =', email, 'senha =', senha);
        dispatch({
            type: 'autenticandoUsuario'
        });
                
        Api.autenticarUsuario(usuario)
        .then((usuarioAutenticado) => {
            //console.log('Usuário Autenticado =', usuarioAutenticado);
            guardar('biblioteca_usuario', usuarioAutenticado);
            dispatch({ 
                type: 'usuarioAutenticado',
                payload: usuarioAutenticado
            });
        })
        .catch((error) => {
            console.log('erro =', JSON.stringify(error));
            //alert(`Código: ${error.code} - Mensagem: ${error.message}`);
            dispatch({
                type: 'usuarioNaoAutenticado',
                payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', codigo: error.code, texto: error.message } }
            });
        });
    } catch (error) {
        const customError = {
            code: 'auth/error-user-auth',
            message: error.message
        }
        console.log(customError);
        dispatch({
            type: 'usuarioNaoAutenticado',
            payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', codigo: customError.code, texto: customError.message } }
        });
    }
}

export const recuperarUsuario = (dispatch) => {
    let usuario = recuperar('biblioteca_usuario');
    //console.log('usuario recuperado? =', JSON.stringify(usuario));
    if (usuario) {
        dispatch({ 
            type: 'usuarioAutenticado',
            payload: usuario
        });
    }
}


export const sairUsuario = (dispatch) => {
    try {
        //console.log('sairUsuario');

        dispatch({ 
            type: 'sairUsuario'
        });

        remover('biblioteca_usuario');

    } catch (erro) {
        console.log(erro);
    }
}


export const salvarUsuario = (dispatch, usuario, mensagemComponente) => {

    dispatch({
        type: 'salvandoUsuario'
    });
    
    Api.salvarUsuario(usuario)
    .then((usuarioSalvo) => {
        dispatch({ 
            type: 'usuarioSalvo',
            payload: usuarioSalvo
        });
    })
    .catch((error) => {
        console.log('erro =', JSON.stringify(error));
        //alert(`Código: ${error.code} - Mensagem: ${error.message}`);
        dispatch({
            type: 'usuarioNaoSalvo',
            payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', codigo: error.code, texto: error.message } }
        });
    });

}

export const listarUsuarios = (dispatch, mensagemComponente, legenda) => { 
    dispatch({ 
        type: 'listandoUsuarios'
    });

    Api.listarUsuarios(legenda)
    .then((listaUsuarios) => {            
        dispatch({ 
            type: 'usuariosListados',
            payload: listaUsuarios
        });
    })
    .catch((error) => {
        console.log('erro =', JSON.stringify(error));
        //alert(`Código: ${error.code} - Mensagem: ${error.message}`);
        dispatch({
            type: 'usuariosNaoListados',
            payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', codigo: error.code, texto: error.message } }
        });
    });
}