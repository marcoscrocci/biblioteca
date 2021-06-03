import React from 'react'
import { useHistory } from "react-router-dom";
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icones from './Icones';


export default function MenuItem(props) {
    const history = useHistory();
    return (
        <div>
            <ListItem button key={props.chave}>
                <ListItemIcon onClick={() => history.push(props.caminho)} >{<Icones icone={props.icone} />}</ListItemIcon>
                <ListItemText onClick={() => history.push(props.caminho)} primary={props.descricao} />
            </ListItem>
        </div>
    )

}   