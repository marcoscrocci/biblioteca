import React, { useState, forwardRef, useImperativeHandle, useContext, useEffect, useRef } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import Slide from '@material-ui/core/Slide';
import EntradaTexto from '../../componentes/EntradaTexto'
import Linha from '../../componentes/Linha'
import { botaoEstilo, dialogFormEstilo, dialogFormExcluirEstilo } from '../../estilos'
import GlobalContext from '../../context/GlobalContext'
//import { criptografar } from '../Utils'
import { registrarUsuario } from '../../context/UsuarioActions'
import Mensagem from '../../componentes/Mensagem'
import { Fullscreen } from '@material-ui/icons'
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
//import { listarGrupos } from '../context/GrupoActions'
//import { descricaoOrdenar } from '../Utils'
import Icones from '../../componentes/Icones';
//import ListaOpcoes from '../../componentes/ListaOpcoes'
//import Loader from '../../componentes/Loader'
//import TeclaPressionada from '../../componentes/TeclaPressionada'



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
    const [Ativo, setAtivo] = useState(null);
    const [Senha, setSenha] = useState(null);
    const [Confirmacao, setConfirmacao] = useState(null);
    

    useImperativeHandle(ref, () => ({
        abrirUsuarioForm(usuario) {
            // if (opcoesGrupo.length === 0) {
            //     listarGrupos(dispatch, mensagem)
            // }
            setID(usuario.id);
            setNome(usuario.nome);
            setEmail(usuario.email);
            setAtivo(usuario.ativo);
            setSenha(null);
            setConfirmacao(null);


            //setGruposSelecionados(usuario.UsuarioGrupos)
            // let GruposIdDesc = []
            // if (usuario.UsuarioGrupos) {
            //     GruposIdDesc = usuario.UsuarioGrupos.map((Grupo) => {
            //         return {
            //             id: Grupo.GrupoID,
            //             descricao: Grupo.Nome
            //         }
            //     })
            // }
            // gruposDeAcesso.current.atualizarSelecionados(GruposIdDesc)
            // setAtivo(ativo)
            setOpen(true);
            autoFocus()
        }
    }))

    // Quando o usuário pressionar o "Atualizar" na tela "Lista de Usuários",
    // devemos atualizar também os grupos de acesso disponíveis.
    // useEffect(() => {
    //     // Zerar a lista para ser atualizada no método abrirUsuarioForm.
    //     setOpcoesGrupo([])
    // }, [state.usuarios])

    // useEffect(() => {
    //     if (state.grupos) {
    //         const opcoesGrupo = state.grupos.map((Grupo) => {
    //             return {
    //                 id: Grupo.GrupoID,
    //                 descricao: Grupo.Nome
    //             }
    //         })
    //         setOpcoesGrupo(descricaoOrdenar(opcoesGrupo))
    //     }
    // }, [open, state.grupos])


    useEffect(() => {
        if (!state.estaSalvandoUsuario && !state.erroSalvandoUsuario) {
            handleClose()
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
            alert("Alterar...")
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
                senha: Senha
            }

            registrarUsuario(dispatch, usuario, mensagem);
        }
        
        // const usuario = {
        //     UsuarioID: UsuarioID,
        //     Nome: Nome,
        //     Login: Login,
        //     //Senha: criptografar(Senha),
        //     Matricula: Matricula,
        //     SegundosAtualizar: SegundosAtualizar,
        //     Ativo: Ativo,
        //     UsuarioAutorID: state.usuario.UsuarioID,
        //     UsuarioGrupos: EnviarGrupos
        // }

        // if (!UsuarioID && Senha) {
        //     usuario.Senha = criptografar(Senha)
        // }

        // //alert(JSON.stringify(usuario))
        // salvarUsuario(dispatch, usuario, mensagem)
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
        return (!Ativo && state.usuario.Email === Email)
    }

    // const administrador = () => {
    //     return (!Ativo && Email === "admin")
    // }

    const aviso = () => {
        // if (administrador()) {
        //     return "O usuário administrador não pode ser removido!"
        // }
        if (mesmoUsuario()) {
            return "O usuário autenticado não pode remover ele mesmo!"
        }
        return
    }

    const podeRemover = () => {
        return true; // !mesmoUsuario() && !administrador()
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
                            <EntradaTexto
                                id="email"
                                colunas="12"
                                rotulo={state.legenda.email}
                                valor={Email}
                                onChange={(e) => setEmail(e.target.value)}
                                nome="Email"
                                requerido={true}
                                somenteLeitura={!Ativo}
                            />
                        </Linha>
                        {!ID && 
                            <Linha>
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
                                />
                            </Linha>
                        }
                        {/* <div className="margem-inferior">
                            <Linha>
                                {state.estaListandoGrupos && <Loader />}
                                <ListaOpcoes
                                    titulo={state.legenda.usuariosTituloGrupos}
                                    dica={state.legenda.usuarioDicaGrupos}
                                    opcoes={opcoesGrupo}
                                    selecionados={UsuarioGrupos}
                                    obterSelecionados={(itens) => setUsuarioGrupos(itens)}
                                    ref={gruposDeAcesso}
                                />
                            </Linha>
                        </div> */}
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