import React, { useContext } from 'react'
import MenuItem from './MenuItem'
import MenuTree from './MenuTree'
import GlobalContext from '../context/GlobalContext'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import { useHistory } from "react-router-dom";
import { remover } from '../Utils'
import { sairUsuario } from '../context/UsuarioActions'
import Icones from './Icones';

export default function Menu() {
    const { state, dispatch } = useContext(GlobalContext)
    const history = useHistory();

    const criarMenuItem = (menu) => {
        return (
            <MenuItem chave={menu.MenuID} key={menu.MenuID}
                caminho={'/' + menu.Caminho}
                descricao={menu.Descricao}
                icone={menu.Icone}
            />
        )
    }

    const carregarSubMenu = (descricao, subMenu, icone) => {
        return (
            <MenuTree descricao={descricao} icone={icone}>
                {carregarMenu(subMenu)}
            </MenuTree>
        )
    }

    const main = () => {
        history.push('/')
    }

    const sair = () => {
        history.push('/')
        remover('dashboard_usuario')
        remover('dashboard_manterConectado')
        sairUsuario(dispatch)
    }



    const carregarMenu = (menuItens) => {
        return (
            menuItens && menuItens.map((menu) => {
                if (menu.menu_sub && menu.menu_sub.length > 0) {
                    return carregarSubMenu(menu.Descricao, menu.SubMenu, menu.Icone)
                } else {
                    return criarMenuItem(menu)
                }
            })
        )
    }


    return (
        <div>
            <List>
                <div>
                    <ListItem button key={-1}>
                        <ListItemIcon onClick={main} >{<Icones icone='Principal' />}</ListItemIcon>
                        <ListItemText onClick={main} primary={state.legenda.principal} />
                    </ListItem>
                </div>
                {carregarMenu(state.menu)}
                <div>
                    <ListItem button key={0}>
                        <ListItemIcon onClick={sair} >{<Icones icone='Sair' />}</ListItemIcon>
                        <ListItemText onClick={sair} primary={state.legenda.sair} />
                    </ListItem>
                </div>
            </List>

        </div>
    )
}
