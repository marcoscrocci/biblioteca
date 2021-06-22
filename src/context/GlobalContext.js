import React, { createContext, useReducer } from 'react';
import { actions as sistemaActions } from './SistemaActions';
import { actions as usuarioActions } from './UsuarioActions';
import { actions as livroActions } from './LivroActions';
import { actions as testActions } from './TestActions';


const initialState = {
    barraLateral: true,
    usuario: null,
    menu: [
        {
            MenuID: 1,
            Descricao: 'Livros',
            Icone: 'Livros',
            Caminho: 'livros',
            Ordem: 1,
            SubMenuID: null,
            SubMenu: [],
            Administrador: false
        },
        {
            MenuID: 2,
            Descricao: 'Usuários',
            Icone: 'Usuarios',
            Caminho: 'usuarios',
            Ordem: 2,
            SubMenuID: null,
            SubMenu: [],
            Administrador: true
        }
    ]
}

const GlobalContext = createContext(initialState)


const actions = {
    ...sistemaActions,
    ...usuarioActions,
    ...livroActions,
    ...testActions
}

export const GlobalProvider = props => {

    function reducer(state, action) {
        const fn = actions[action.type]
        return fn ? fn(state, action) : state
    }

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {props.children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext