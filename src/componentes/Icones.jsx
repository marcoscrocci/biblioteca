import React from 'react'
import Icon from '@material-ui/core/Icon';
//import SvgIcon from '@material-ui/core/SvgIcon';
import {
    Home as Principal,
    MenuBook as Livros,
    Dashboard,
    //MoveToInbox as InboxIcon,
    Group as Usuarios,
    MeetingRoom as Sair,
    Router as Network,
    SettingsRemote as Sensor,
    Room as Local,
    Category as Categoria,
    Kitchen as Equipamento,
    GroupWork as Grupo,
    Refresh as Atualizar,
    Directions as TipoRegra,
    EventNote as Application,
    VolumeUp as Audio,
    FontDownload as Estilo,
    Add as Adicionar,
    Save as Salvar,
    Clear as Cancelar,
    Delete as Excluir,
    ZoomIn as MaisZoom,
    ZoomOut as MenosZoom,
    ColorLens as Personalizar,
    Assignment as Account,
    Person as Autor,
    Menu,
    Apps as SistemaIcones
} from '@material-ui/icons';

// Selecionar ícone. Priorizar pela ordem abaixo:

// 1 - https://material-ui.com/pt/components/material-icons/  ***//
// Procure o ícone desejado no site e declare no import do '@material-ui/icons'
// ou
// https://material.io/resources/icons/?search=map&icon=location_on&style=baseline
// Para utilizar os ícones deste site, devemos baixar o arquivo svg,
// abrir o arquivo e extrair a tag <path d="..." /> e colocar dentro da tag
// <SvgIcon {...props}><path d="..." /></SvgIcon>

// 3 - https://materialdesignicons.com/  ***//
// Para utilizar os ícones deste site, devemos baixar o arquivo svg,
// abrir o arquivo e extrair a tag <path d="..." /> e colocar dentro da tag
// <SvgIcon {...props}><path d="..." /></SvgIcon>

// 4 - https://fontawesome.com/icons?d=gallery&m=free  ***//
// Procure o ícone desejado no site e coloque no className do componente <Icon />
// <Icon className='fa fa-edit' />

// 5 - /Users/marcoscrocci/Projetos/dashboard/frontend/node_modules/ionicons/readme.md



export default function Icones(props) {
    switch (props.icone) {
        case 'Principal':
            return <Principal />
        case 'Livros':
            return <Livros />
        case 'Dashboard':
            return <Dashboard />
        case 'Usuarios':
            return <Usuarios />
        case 'Unidades':
            return <Icon className="fa fa-thermometer" />   
        case 'Categoria':
            return <Categoria />
        case 'Local':
            return <Local />
        case 'Equipamento':
            return <Equipamento />
        case 'Grupo':
            return <Grupo />
        case 'Sensor':
            return <Sensor />
        case 'TipoRegra':
            return <TipoRegra />
        case 'Application':
            return <Application />
        case 'Audio':
            return <Audio />
        case 'Estilo':
            return <Estilo />
        case 'Atualizar':
            return <Atualizar />
        case 'Adicionar':
            return <Adicionar />
        case 'Salvar':
            return <Salvar />
        case 'Cancelar':
            return <Cancelar />
        case 'Excluir':
            return <Excluir />
        case 'Network':
            return <Network />
        case 'MaisZoom':
            return <MaisZoom />
        case 'MenosZoom':
            return <MenosZoom />
        case 'Personalizar':
            return <Personalizar />
        case 'Account':
            return <Account />
        case 'Autor':
            return <Autor />
        case 'Menu':
            return <Menu />
        case 'SistemaIcones':
            return <SistemaIcones />
        case 'Teste':
            return <Icon className='fa fa-user' />
        case 'Sair':
            return <Sair />

        default:
            return <Icon className={props.icone} />;
    }

}
