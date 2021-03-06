import React, { useState, forwardRef, useImperativeHandle, useContext, useEffect, useRef } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Slide from '@material-ui/core/Slide';
import EntradaTexto from '../../componentes/EntradaTexto'
import CaixaSelecao from '../../componentes/CaixaSelecao'
import Linha from '../../componentes/Linha'
import { botaoEstilo, dialogFormEstilo, dialogFormExcluirEstilo } from '../../estilos'
import GlobalContext from '../../context/GlobalContext'
import { salvarUsuario } from '../../context/UsuarioActions'
import Mensagem from '../../componentes/Mensagem'
import { Fullscreen } from '@material-ui/icons'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Icones from '../../componentes/Icones';



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


const UsuarioForm = forwardRef((props, ref) => {
    const { state, dispatch } = useContext(GlobalContext);
    const [open, setOpen] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const mensagem = useRef();
    //const gruposDeAcesso = useRef()

    const [ID, setID] = useState(null);
    const [Nome, setNome] = useState(null);
    const [Email, setEmail] = useState(null);
    const [Administrador, setAdministrador] = useState(null);
    const [Ativo, setAtivo] = useState(null);
    const [Senha, setSenha] = useState(null);
    const [Confirmacao, setConfirmacao] = useState(null);
    

    useImperativeHandle(ref, () => ({
        abrirUsuarioForm(usuario) {
            //console.log('abrirUsuarioForm =', usuario);
            setID(usuario.id);
            setNome(usuario.nome);
            setEmail(usuario.email);
            setAdministrador(usuario.administrador);
            setAtivo(usuario.ativo);
            setSenha(null);
            setConfirmacao(null);

            setOpen(true);
            autoFocus()
        }
    }));


    useEffect(() => {
        if (!state.estaSalvandoUsuario && !state.erroSalvandoUsuario) {
            handleClose();
        }
    }, [state.estaSalvandoUsuario, state.erroSalvandoUsuario]);


    const handleClose = () => {
        setOpen(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        if (ID) {
            if (!Nome || !Email) {
                return false;
            }
            const usuario = {
                id: ID,
                nome: Nome,
                email: Email,
                senha: Senha,
                administrador: Administrador,
                ativo: Ativo
            }

            salvarUsuario(dispatch, usuario, mensagem);
        } else {
            if (!Nome || !Email || !Senha) {
                return false;
            };
    
            if (Senha !== Confirmacao) {
                mensagem.current.mostrarMensagem({
                    tipo: 'error',
                    texto: state.legenda.usuarioSenhaConfirmacao
                });
                return false
            };

            const usuario = {
                nome: Nome,
                email: Email,
                senha: Senha,
                administrador: Administrador,
                ativo: true
            }

            salvarUsuario(dispatch, usuario, mensagem);
        }
        
    }

    const handleFullscreen = () => {
        setFullscreen(!fullscreen)
    }

    function autoFocus() {
        setTimeout(() => {
            if (Ativo) {
                document.getElementById("nome").focus();
                document.getElementById("nome").select();
            }
        }, 100);
    }

    const mesmoUsuario = () => {
        //console.log('mesmoUsuario =', Ativo, state.usuario.email, Email);
        return (!Ativo && state.usuario.email === Email);
    }

    // const administrador = () => {
    //     return (!Ativo && Email === "admin")
    // }

    const aviso = () => {
        // if (administrador()) {
        //     return "O usu??rio administrador n??o pode ser removido!"
        // }
        if (mesmoUsuario()) {
            return "O usu??rio autenticado n??o pode remover ele mesmo!"
        }
        return
    }

    const podeRemover = () => {
        return !mesmoUsuario(); //&& !administrador()
    }


    return (
        <div>
            <Dialog
                fullScreen={fullscreen}
                open={open}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                TransitionComponent={Transition}
                keepMounted
            >
                <DialogTitle style={Ativo ? dialogFormEstilo : dialogFormExcluirEstilo} id="draggable-dialog-title" onFullscreen={handleFullscreen}>
                    {ID ? (Ativo ? state.legenda.editarUsuario : state.legenda.excluirUsuario) : state.legenda.adicionarUsuario}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <Linha>
                            <EntradaTexto
                                id="nome"
                                colunas="12"
                                rotulo={state.legenda.nome}
                                valor={Nome}
                                onChange={(e) => setNome(e.target.value)}
                                nome="Nome"
                                requerido={true}
                                somenteLeitura={!Ativo}
                            />
                        </Linha>
                        {!ID && 
                            <Linha>
                                <EntradaTexto
                                    id="email"
                                    colunas="12"
                                    rotulo={state.legenda.email}
                                    valor={Email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    nome="Email"
                                    requerido={true}
                                    somenteLeitura={!Ativo}
                                    autoCompletar={false}
                                />
                                <EntradaTexto
                                    id="senha"
                                    tipo="password"
                                    colunas="12"
                                    rotulo={state.legenda.senha}
                                    valor={Senha}
                                    onChange={(e) => setSenha(e.target.value)}
                                    nome="Senha"
                                    requerido={true}
                                    somenteLeitura={!Ativo}
                                    autoCompletar={false}
                                />
                                <EntradaTexto
                                    id="confirmacao"
                                    tipo="password"
                                    colunas="12"
                                    rotulo={state.legenda.confirmarSenha}
                                    valor={Confirmacao}
                                    onChange={(e) => setConfirmacao(e.target.value)}
                                    nome="Confirmacao"
                                    requerido={true}
                                    somenteLeitura={!Ativo}
                                    autoCompletar={false}
                                />
                            </Linha>
                        }
                        <Linha>
                            <CaixaSelecao
                                rotulo={state.legenda.administrador}
                                marcado={Administrador}
                                onChange={(e) => setAdministrador(e.target.checked)}
                                dica={state.legenda.dicaAdministrador}
                            />
                        </Linha>
                        <br />
                        {aviso() &&
                            <div className="mensagem-aviso">{aviso()}</div>
                        }
                        <div>                            
                            {podeRemover() &&
                                <Button
                                    type="submit"
                                    color="primary"
                                    variant="contained"
                                    style={botaoEstilo}
                                    startIcon={<Icones icone={Ativo ? 'Salvar': 'Excluir'} />}
                                >
                                    {state.legenda.confirmar}
                                </Button>
                            }
                            <Button
                                onClick={handleClose}
                                color="secondary"
                                variant="contained"
                                style={botaoEstilo}
                                startIcon={<Icones icone='Cancelar' />}
                            >
                                {state.legenda.cancelar}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
                <DialogActions>

                </DialogActions>
            </Dialog>
            <Mensagem ref={mensagem} />
            {/* <TeclaPressionada 
                comandos={[
                    {tecla: state.teclaFechar, funcao: handleClose}
                ]}
            /> */}
        </div>
    )

})

export default UsuarioForm