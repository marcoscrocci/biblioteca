import firebase from 'firebase/app';
import FirebaseClient from './../FirebaseClient'

export const actions = {
    mudarBarraLateral(state, action) {
        //console.log('action')
        return {
            ...state,
            barraLateral: action.payload
        }
    },

    carregandoLegendas(state, action) {
        return {
            ...state,
            erroCarregandoLegendas: false,
            estaCarregandoLegendas: true
        }
    },

    legendasCarregadas(state, action) {
        const legenda = action.payload;
        
        return { 
            ...state,
            erroCarregandoLegendas: false,
            estaCarregandoLegendas: false,
            legenda
        }
    },
}

export const mudarBarraLateral = (dispatch, valor) => {
    //console.log('mudarBarraLateral')
    dispatch({
        type: 'mudarBarraLateral',
        payload: valor
    })
}

export const carregarLegendas = (dispatch, idioma = "portugues") => {
    try {
        FirebaseClient();
        dispatch({
            type: 'carregandoLegendas'
        });
        firebase.database().ref("legendas").child(idioma).get().then((dados) => {
            const legenda = JSON.parse(JSON.stringify(dados));
            //setLanguages(legenda);    
            dispatch({ 
                type: 'legendasCarregadas',
                payload: legenda
            });
        })



    } catch (error) {
        
    }
}