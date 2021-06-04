import firebase from 'firebase/app';
import FirebaseClient from './../FirebaseClient'
import { guardar, recuperar, remover, mostrarMensagem } from '../Utils'
import b64 from 'base-64';

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

    registrandoUsuario(state, action) {
        return {
            ...state,
            erroRegistrandoUsuario: false,
            estaRegistrandoUsuario: true
        }
    },

    usuarioRegistrado(state, action) {
        const mensagemComponente = action.payload;
        const msg = { mensagemComponente, mensagemObjeto: { tipo: 'success', texto: state.legenda.operacaoRealizadaComSucesso } }

        mostrarMensagem(msg, state);
        return {
            ...state,
            erroSalvandoUsuario: false,
            estaSalvandoUsuario: false
        }
    },

    usuarioNaoRegistrado(state, action) {
        //console.log('mostrarMensagem =', action.payload);
        mostrarMensagem(action.payload, state);
        return {
            ...state,
            erroRegistrandoUsuario: true,
            estaRegistrandoUsuario: false
        }
    },

}


export const autenticarUsuario = (dispatch, usuario, mensagemComponente) => {
    try {
        //console.log('autenticarUsuario - email =', email, 'senha =', senha);
        const {email, senha} = usuario;
        dispatch({
            type: 'autenticandoUsuario'
        });

        FirebaseClient();
        const usuarioFirebase = firebase.auth();
   
        
        usuarioFirebase.signInWithEmailAndPassword(email, senha)
        .then(() => {
            const usuario = usuarioFirebase.currentUser;
            //let emailB64 = b64.encode(usuario.email);
            //console.log('emailB64 =', emailB64);
            //const usuarios = firebase.database().ref("usuarios");
            //console.log('usuarios =', JSON.stringify(JSON.parse(usuarios)));
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
                payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', codigo: error.code, texto: error.message } }
            });
        });


    } catch (error) {
        //alert(`Código: ${error.code} - Mensagem: ${error.message}`);
        console.log(`Código: ${error.code} - Mensagem: ${error.message}`);
        dispatch({
            type: 'usuarioNaoAutenticado',
            payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', codigo: error.code, texto: error.message } }
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


export const registrarUsuario = (dispatch, usuario, mensagemComponente) => {
    const {nome, email, senha} = usuario;
    try {
        firebase.auth().createUserWithEmailAndPassword(email, senha)
        .then(user => {
            let emailB64 = b64.encode(email);
            
            const usuarios = firebase.database().ref("usuarios");
            const usuario = usuarios.child(emailB64);
            usuario.set({email, nome})
            .then(() => {
                dispatch({ 
                    type: 'usuarioRegistrado',
                    payload: mensagemComponente
                });
            });
        })
        .catch((error) => {
            //alert(`Código: ${error.code} - Mensagem: ${error.message}`);
            console.log(`Código: ${error.code} - Mensagem: ${error.message}`);
            dispatch({
                type: 'usuarioNaoRegistrado',
                payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', titulo: 'Erro', codigo: error.code, texto: error.message } }
            });
        });

    } catch (error) {
        console.log(`Código: ${error.code} - Mensagem: ${error.message}`);
        dispatch({
            type: 'usuarioNaoAutenticado',
            payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', titulo: 'Erro', texto: error.message } }
        });
    }

}