import React, { useState, useContext, useEffect, useRef } from 'react'
import {
    Button,
    Dialog,
    DialogContent,
    Paper,
    Slide,
    IconButton,
    Typography,
    withStyles,
    makeStyles,
    DialogTitle as MuiDialogTitle
} from '@material-ui/core';
import Draggable from 'react-draggable';
import EntradaTexto from '../../componentes/EntradaTexto'
import Linha from '../../componentes/Linha'
import Grade from '../../componentes/Grade'
import { botaoEstilo, dialogFormEstilo } from '../../estilos'
//import { criptografar, guardar, recuperar, descriptografar } from '../../Utils'
import Mensagem from '../../componentes/Mensagem'
import Loader from '../../componentes/Loader'
import { Fullscreen } from '@material-ui/icons'
import { isMobile } from 'react-device-detect'
//import logoihsl from '../recursos/logoihsl.jpg'
//import { api_chave, senhaPadrao, autoLogin } from '../config'
//import CaixaSelecao from '../../componentes/CaixaSelecao'
//import { useHistory } from "react-router-dom";
//import { osName, browserName } from 'react-device-detect'
import { autenticarUsuario } from '../../context/UsuarioActions'
import GlobalContext from '../../context/GlobalContext'

//import firebase from 'firebase/app';
//import FirebaseClient from '../../FirebaseClient'

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    fullscreenButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const useStyles = makeStyles(() => ({
    paper: { maxWidth: '470px' }
}))

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onFullscreen, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            <IconButton aria-label="Tela cheia" className={classes.fullscreenButton} onClick={onFullscreen}>
                <Fullscreen />
            </IconButton>
        </MuiDialogTitle>
    );
});


function PaperComponent(props) {
    return (
        <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
            <Paper {...props} />
        </Draggable>
    );
}

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Login() {
    //FirebaseClient();
    const { state, dispatch } = useContext(GlobalContext);
    const [open, setOpen] = useState(false);
    const [fullscreen, setFullscreen] = useState(false)
    const mensagem = useRef()
    const classes = useStyles();
    //const history = useHistory();

    const [Email, setEmail] = useState();
    const [Senha, setSenha] = useState();

    useEffect(() => {
        setFullscreen(isMobile);
        setOpen(true);
        autoFocus();
    }, [])


    const obterLegenda = (chave) => {
        if (state.legenda) {
            return state.legenda[chave];
        } else {
            return '...';
        }
    }

    const entrar = () => {
        //var email = "curso.firebase@gmail.com";
        //var senha = "secret12345";
        
        autenticarUsuario(dispatch, Email, Senha);
    }

    const handleFullscreen = () => {
        setFullscreen(!fullscreen);
    }

    function autoFocus() {
        setTimeout(() => {
            const login = document.getElementById("login");
            if (login) {
                login.focus();
                login.select();
            }
        }, 300);
    }



    return (
        <div>
            <Dialog
                classes={{ paper: classes.paper }}
                fullScreen={fullscreen}
                fullWidth={true}
                open={open}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle style={dialogFormEstilo} id="draggable-dialog-title" onFullscreen={handleFullscreen}>
                    {obterLegenda('entrarTitulo')}
                </DialogTitle>
                <DialogContent>
                    <form>
                        {/* <div className="ihsl-recipiente texto-cinza centralizado">
                            <img src={logoihsl} alt="IHSL Logo" className="quadrado-pequeno" />
                            <div className="centralizado-vertical">
                                <label className="margem-texto">state.legenda.ihsl</label>
                            </div>
                        </div> */}
                        <Linha>
                            <Grade>
                                <div className="margem-inferior">
                                    <label className="texto-cinza">{obterLegenda('entrarInformeCredenciais')}</label>
                                </div>
                            </Grade>
                            <EntradaTexto
                                id="login"
                                colunas="12"
                                rotulo={obterLegenda('entrarEmail')}
                                valor={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                nome="Login"
                                required={true}
                            />
                            <EntradaTexto
                                colunas="12"
                                tipo="password"
                                rotulo={obterLegenda('entrarSenha')}
                                valor={Senha}
                                onChange={(e) => setSenha(e.target.value)}
                                nome="Senha"
                                required={true}
                            />
                        </Linha>
                        <div className="botoes-recipiente">
                            <Button
                                //type="submit"
                                color="primary"
                                variant="contained"
                                style={botaoEstilo}
                                onClick={entrar}
                            >
                                {obterLegenda('entrarConfirmar')}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <Mensagem ref={mensagem} />
            {state.estaCarregandoLegendas && <Loader />}
        </div>
    )
}
