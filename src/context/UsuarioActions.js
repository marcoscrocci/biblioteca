import firebase from 'firebase/app';
import FirebaseClient from './../FirebaseClient'
import { guardar, recuperar, remover, mostrarMensagem } from '../Utils'

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
        console.log('mostrarMensagem =', action.payload);
        mostrarMensagem(action.payload)
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
    }

}


export const autenticarUsuario = (dispatch, email, senha, mensagemComponente) => {
    try {
        //console.log('autenticarUsuario - email =', email, 'senha =', senha);
        dispatch({
            type: 'autenticandoUsuario'
        });

        FirebaseClient();
        const usuarioFirebase = firebase.auth();
   
        
        usuarioFirebase.signInWithEmailAndPassword(email, senha)
        .then(() => {
            const usuario = usuarioFirebase.currentUser;
            //console.log('autenticarUsuario - usuario =', usuario);
            dispatch({ 
                type: 'usuarioAutenticado',
                payload: usuario
            });

            guardar('biblioteca_usuario', usuario);

            //alert("Usuário autenticado com sucesso!");
        })
        .catch((error) => {
            //alert(`Código: ${error.code} - Mensagem: ${error.message}`);
            console.log(`Código: ${error.code} - Mensagem: ${error.message}`);
            dispatch({
                type: 'usuarioNaoAutenticado',
                payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', titulo: 'Erro', codigo: error.code, texto: error.message } }
            });
        });


    } catch (error) {
        //alert(`Código: ${error.code} - Mensagem: ${error.message}`);
        console.log(`Código: ${error.code} - Mensagem: ${error.message}`);
        dispatch({
            type: 'usuarioNaoAutenticado',
            payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', titulo: 'Erro', texto: error.message } }
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
