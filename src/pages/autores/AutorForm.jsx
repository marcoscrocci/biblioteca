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

import { salvar } from '../../context/AutorActions'
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


const AutorForm = forwardRef((props, ref) => {
    const { state, dispatch } = useContext(GlobalContext);
    const [open, setOpen] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const mensagem = useRef();
    //const gruposDeAcesso = useRef()

    const [ID, setID] = useState(null);
    const [Nome, setNome] = useState(null);
    const [Wikipedia, setWikipedia] = useState(null); 
    const [Ativo, setAtivo] = useState(null);
    
    

    useImperativeHandle(ref, () => ({
        abrirAutorForm(autor) {
            setID(autor.id);
            setNome(autor.nome);
            setWikipedia(autor.wikipedia);
            setAtivo(autor.ativo);

            setOpen(true);
            autoFocus();
        }
    }));


    useEffect(() => {
        if (!state.estaSalvando && !state.erroSalvando) {
            handleClose();
        }
    }, [state.estaSalvando, state.erroSalvando]);


    const handleClose = () => {
        setOpen(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        if (!Nome) {
            return false;
        }

        const autor = {
            id: ID,
            nome: Nome,
            wikipedia: Wikipedia,
            ativo: Ativo
        }
        
        salvar(dispatch, autor, mensagem);
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



    return (
        <div>
            <Dialog
                fullScreen={fullscreen}
                open={open}
                PaperComponent={PaperComponent}
                aria-labelledby="draggable-dialog-title"
                TransitionComponent={Transition}
                keepMounted
                maxWidth="xs"
            >
                <DialogTitle style={Ativo ? dialogFormEstilo : dialogFormExcluirEstilo} id="draggable-dialog-title" onFullscreen={handleFullscreen}>
                    {ID ? (Ativo ? state.legenda.editarAutor : state.legenda.excluirAutor) : state.legenda.adicionarAutor}
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
                                id="wikipedia"
                                colunas="12"
                                rotulo={state.legenda.wikipedia}
                                valor={Wikipedia}
                                onChange={(e) => setWikipedia(e.target.value)}
                                nome="Wikipedia"
                                somenteLeitura={!Ativo}
                            />
                        </Linha>
                        <div>            
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                style={botaoEstilo}
                                startIcon={<Icones icone={Ativo ? 'Salvar': 'Excluir'} />}
                            >
                                {state.legenda.confirmar}
                            </Button>
                            
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
        </div>
    )

})


export default AutorForm