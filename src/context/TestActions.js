export const actions = {
    listingRows(state, action) {
        return {
            ...state,
            errorListingRows: false,
            isListingRows: true
        }
    },

    unlistedRows(state, action) {
        return {
            ...state,
            errorListingRows: true,
            isListingRows: false
        }
    },

    listedRows(state, action) {
        const dataTest = action.payload;

        return {
            ...state,
            dataTest,
            errorListingRows: false,
            isListingRows: true
        }
    }
}

export const listRows = (dispatch) => {
    try {
        dispatch({
            type: 'listingRows'
        });

        const rows = [];
        for (let i = 1; i <= 10; i++) {
            const row = {
                id: i,
                description: `Row${i}`
            };
            rows.push(row);
        }

        dispatch({
            type: 'listedRows',
            payload: rows
        })
    } catch (error) {
        console.log(`Error listing rows because of an error: ${error}`);
        dispatch({
            type: 'unlistedRows',
            payload: { 
                //messageComponent, 
                messageObject: { 
                    type: 'error', 
                    title: 'Erro', 
                    content: error
                } 
            }
        })
    }
}