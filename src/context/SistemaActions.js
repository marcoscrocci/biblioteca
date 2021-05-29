export const actions = {
    mudarBarraLateral(state, action) {
        //console.log('action')
        return {
            ...state,
            barraLateral: action.payload
        }
    }
}

export const mudarBarraLateral = (dispatch, valor) => {
    //console.log('mudarBarraLateral')
    dispatch({
        type: 'mudarBarraLateral',
        payload: valor
    })
}
