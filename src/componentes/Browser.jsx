import React, { useContext, useRef } from 'react';
import clsx from 'clsx';
import { fade, makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Menu from './Menu'
import GlobalContext from '../context/GlobalContext'
import { mudarBarraLateral } from '../context/SistemaActions'
//import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import MMenu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
//import NotificationsIcon from '@material-ui/icons/Notifications';
import Button from '@material-ui/core/Button';
import { remover, removerCriptografado } from '../Utils'
import { sairUsuario } from '../context/UsuarioActions'
//import { obterNotificacoes } from '../context/DashboardActions'
//import UsuarioSenhaForm from '../telas/UsuarioSenhaForm'
import { botaoUsuario } from '../estilos'
import { useHistory } from "react-router-dom";
import Mensagem from '../componentes/Mensagem'
//import Tooltip from '@material-ui/core/Tooltip';
//import Zoom from '@material-ui/core/Zoom';
//import moment from 'moment'
//import { dataAtual } from '../Utils'


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    // menuButton: {
    //     marginRight: theme.spacing(2),
    //     marginRight: 36,
    // },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    cinza: {
        backgroundColor: 'gray',
        color: "white"
    },
    vermelho: {
        backgroundColor: 'red',
        color: "white"
    },
    roxo: {
        backgroundColor: 'purple',
        color: "white"
    },
    laranja: {
        backgroundColor: 'orange',
        color: "black"
    },
    amarelo: {
        backgroundColor: 'yellow',
        color: "black"
    },

    root: {
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    menuButton: {
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap'
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        })
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        }
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(0)
    },
}));

// const valorInicialNotificacoes = {
//     qtdeCinza: 0, 
//     qtdeVermelho: 0, 
//     qtdeLaranja: 0, 
//     qtdeAmarelo: 0, 
//     qtdeRoxo: 0
// }

export default function Conteudo(props) {
    const { state, dispatch } = useContext(GlobalContext)
    const history = useHistory();
    const mensagem = useRef()
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(state.barraLateral);
    //const [Notificacoes, setNotificacoes] = React.useState(valorInicialNotificacoes)
    
    //const formUsuarioSenha = useRef()
    const [anchorEl, setAnchorEl] = React.useState(null);
    //const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    //const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    // useEffect(() => {
    //     executarObterNotificacoes()
    //     //console.log('state.alterarStatusDashboardSensor')
    //     const p = setInterval(executarObterNotificacoes, (state.usuario.SegundosAtualizar ? state.usuario.SegundosAtualizar : 15) * 1000)
        
    //     return function cleanup() {
    //         clearInterval(p)
    //     }
    // }, [])

    // useEffect(() => {
    //     //console.log(state.notificacoes)
    //     setNotificacoes(state.notificacoes)
    // }, [state.notificacoes])

    // const executarObterNotificacoes = () => {
    //     obterNotificacoes(dispatch, mensagem)
    // }

    /*
    const verificarValidadeSenha = () => {
        setTimeout(() => {
            if (formUsuarioSenha && formUsuarioSenha.current && formUsuarioSenha.current.abrirUsuarioSenhaForm) {
                const dataAtualString = moment(dataAtual()).format('YYYY-MM-DD HH:mm:ss')
                const validadeSenha = moment(state.usuario.ValidadeSenha).format('YYYY-MM-DD HH:mm:ss')
                if (validadeSenha < dataAtualString) {
                    remover('biblioteca_usuario');
                    remover('biblioteca_manterConectado');
                    removerCriptografado('biblioteca_usuario');
                    removerCriptografado('biblioteca_manterConectado');
                    alterarSenha(true)
                }    
            }
        }, 1000);

    }
    */

    const sair = () => {
        history.push('/');
        remover('biblioteca_usuario');
        removerCriptografado('biblioteca_usuario');     
        sairUsuario(dispatch);
        handleMenuClose();
    }

    /*
    const alterarSenha = (obrigarTrocarSenha = false) => {
        var usuario = {
            UsuarioID: state.usuario.UsuarioID,
            Nome: state.usuario.Nome,
            Login: state.usuario.Login,
            Senha: '',
            NovaSenha: ''
        }
        //console.log('obrigarTrocarSenha = ', obrigarTrocarSenha)
        formUsuarioSenha.current.abrirUsuarioSenhaForm(usuario, obrigarTrocarSenha)
        handleMenuClose()
    }
    */


    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // const handleMobileMenuClose = () => {
    //     setMobileMoreAnchorEl(null);
    // };

    const handleMenuClose = () => {
        setAnchorEl(null);
        //handleMobileMenuClose();
    };

    /*const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };*/

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <MMenu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {/* <MenuItem onClick={() => alterarSenha(false)}>{state.legenda.usuarioAlterarSenha}</MenuItem> */}
            <MenuItem onClick={sair}>{state.legenda.sair}</MenuItem>
        </MMenu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';

    const handleDrawerOpen = () => {
        mudarBarraLateral(dispatch, true)
        setOpen(true);
    };

    const handleDrawerClose = () => {
        mudarBarraLateral(dispatch, false)
        setOpen(false);
    };

    // const abrirDashboard = () => {
    //     history.push('/dashboard')
    // }

    // const obterTextoDicaNotificacao = (qtde, nomeCor) => {
    //     let dicaNotificacao = state.legenda.dicaNotificacao.replace('{qtde}', qtde.toString()).replace('{cor}', nomeCor)
    //     if (qtde.toString() === '1') {
    //         dicaNotificacao = dicaNotificacao.replace('Existem', 'Existe').replace('alertas', 'alerta')
    //     }
    //     return dicaNotificacao
    // } 

    /*
    const notificacaoCinza = () => {
        if (Notificacoes.qtdeCinza && Notificacoes.qtdeCinza > 0) {
            return (
                <Tooltip title={obterTextoDicaNotificacao(Notificacoes.qtdeCinza, 'Cinza')} arrow={true} TransitionComponent={Zoom}> 
                    <IconButton aria-label="show 17 new notifications" color="inherit" onClick={abrirDashboard}>
                        <Badge badgeContent={Notificacoes.qtdeCinza} classes={{ badge: classes.cinza }}>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>        
            )
        } else {
            return false
        }
    }
    const notificacaoVermelho = () => {
        if (Notificacoes.qtdeVermelho && Notificacoes.qtdeVermelho > 0) {
            return (
                <Tooltip title={obterTextoDicaNotificacao(Notificacoes.qtdeVermelho, 'Vermelho')} arrow={true} TransitionComponent={Zoom}> 
                    <IconButton aria-label="show 17 new notifications" color="inherit" onClick={abrirDashboard}>
                        <Badge badgeContent={Notificacoes.qtdeVermelho} classes={{ badge: classes.vermelho }}>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>        
            )
        } else {
            return false
        }
    }
    const notificacaoRoxo = () => {
        if (Notificacoes.qtdeRoxo && Notificacoes.qtdeRoxo > 0) {
            return (
                <Tooltip title={obterTextoDicaNotificacao(Notificacoes.qtdeRoxo, 'Roxo')} arrow={true} TransitionComponent={Zoom}> 
                    <IconButton aria-label="show 17 new notifications" color="inherit" onClick={abrirDashboard}>
                        <Badge badgeContent={Notificacoes.qtdeRoxo} classes={{ badge: classes.roxo }}>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>       
            )
        } else {
            return false
        }
    }
    const notificacaoLaranja = () => {
        if (Notificacoes.qtdeLaranja && Notificacoes.qtdeLaranja > 0) {
            return (
                <Tooltip title={obterTextoDicaNotificacao(Notificacoes.qtdeLaranja, 'Laranja')} arrow={true} TransitionComponent={Zoom}> 
                    <IconButton aria-label="show 17 new notifications" color="inherit" onClick={abrirDashboard}>
                        <Badge badgeContent={Notificacoes.qtdeLaranja} classes={{ badge: classes.laranja }}>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>        
            )
        } else {
            return false
        }
    }
    const notificacaoAmarelo = () => {
        if (Notificacoes.qtdeAmarelo && Notificacoes.qtdeAmarelo > 0) {
            return (
                <Tooltip title={obterTextoDicaNotificacao(Notificacoes.qtdeAmarelo, 'Amarelo')} arrow={true} TransitionComponent={Zoom}> 
                    <IconButton aria-label="show 17 new notifications" color="inherit" onClick={abrirDashboard}>
                        <Badge badgeContent={Notificacoes.qtdeAmarelo} classes={{ badge: classes.amarelo }}>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>        
            )
        } else {
            return false
        }
    }
    const notificacaoTodos = () => {
        let qtdeTodos = 0
        let cor = classes.amarelo
        if (Notificacoes.qtdeAmarelo && Notificacoes.qtdeAmarelo > 0) {
            qtdeTodos += Notificacoes.qtdeAmarelo
        }
        if (Notificacoes.qtdeLaranja && Notificacoes.qtdeLaranja > 0) {
            cor = classes.laranja
            qtdeTodos += Notificacoes.qtdeLaranja
        }
        if (Notificacoes.qtdeRoxo && Notificacoes.qtdeRoxo > 0) {
            cor = classes.roxo
            qtdeTodos += Notificacoes.qtdeRoxo
        }
        if (Notificacoes.qtdeVermelho && Notificacoes.qtdeVermelho > 0) {
            cor = classes.vermelho
            qtdeTodos += Notificacoes.qtdeVermelho
        }
        if (Notificacoes.qtdeCinza && Notificacoes.qtdeCinza > 0) {
            cor = classes.cinza
            qtdeTodos += Notificacoes.qtdeCinza
        }
        
        
        if (qtdeTodos > 0) {
            return (
                <Tooltip title={state.legenda.dicaNotificacao.replace('{qtde}', qtdeTodos.toString()).replace('{cor}', '')} arrow={true} TransitionComponent={Zoom}> 
                    <IconButton aria-label="show 17 new notifications" color="inherit" onClick={abrirDashboard}>
                        <Badge badgeContent={qtdeTodos} classes={{ badge: cor }}>
                            <NotificationsIcon />
                        </Badge>
                    </IconButton>
                </Tooltip>        
            )
        } else {
            return false
        }
    }
*/
    

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <a href="/" className='titulo-aplicativo'>
                            {state.legenda.nomeAplicativo}
                        </a>
                    </Typography>
                    
                    <div className={classes.grow} />
                    <div className={classes.sectionDesktop}>
                        {/* {notificacaoCinza()}
                        {notificacaoVermelho()}
                        {notificacaoRoxo()}
                        {notificacaoLaranja()}
                        {notificacaoAmarelo()} */}
                        
                        <Button
                            style={botaoUsuario} 
                            onClick={handleProfileMenuOpen} 
                            color="primary" 
                            variant="contained"
                            // style={botaoEstilo}
                            endIcon={<AccountCircle />}
                        >
                            {state.usuario.nome}
                        </Button>
                    

                    </div>
                    <div className={classes.sectionMobile}>
                        {/* {notificacaoTodos()} */}
                        <IconButton
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>                    
                    
                </Toolbar>
            </AppBar>
            {/* {renderMobileMenu} */}
            {renderMenu}

            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                <div className={classes.toolbar}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <Menu />
            </Drawer>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                <div>{props.children}</div>
            </main>
            {/* <div>
                <UsuarioSenhaForm
                    ref={formUsuarioSenha}
                />
            </div> */}
            <div>
                <Mensagem ref={mensagem} />
            </div>
            {/* {verificarValidadeSenha()} */}
        </div>
    );
}
