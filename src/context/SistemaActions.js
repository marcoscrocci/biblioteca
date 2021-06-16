import legendas from '../recursos/legendas.json';


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
        dispatch({
            type: 'carregandoLegendas'
        });

        let legenda
        if (idioma === "portugues") {
            legenda = legendas.portugues;
        }

        dispatch({
            type: 'legendasCarregadas',
            payload: legenda
        })


    } catch (error) {
        
    }
}