import firebase from 'firebase/app';
import FirebaseClient from './../FirebaseClient'
import { guardar, recuperar, remover } from '../Utils'

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

    sairUsuario(state, action) {
        return {
            ...state,
            usuario: null,
            token: null
            //menu: null
        }
    }

}


export const autenticarUsuario = (dispatch, email, senha) => {
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
            alert(`Código: ${error.code} - Mensagem: ${error.message}`);
        });


    } catch (error) {
        alert(`Código: ${error.code} - Mensagem: ${error.message}`);
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
