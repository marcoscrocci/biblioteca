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

import { salvarLivro } from '../../context/LivroActions'
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


const LivroForm = forwardRef((props, ref) => {
    const { state, dispatch } = useContext(GlobalContext);
    const [open, setOpen] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const mensagem = useRef();
    //const gruposDeAcesso = useRef()

    const [ID, setID] = useState(null);
    const [Tombo, setTombo] = useState(null);
    const [TomboFim, setTomboFim] = useState(null);
    const [Titulo, setTitulo] = useState(null);
    const [Autor, setAutor] = useState(null);
    const [Editora, setEditora] = useState(null);    
    const [Ativo, setAtivo] = useState(null);
    
    

    useImperativeHandle(ref, () => ({
        abrirLivroForm(livro) {
            setID(livro.id);
            setTombo(livro.tombo);
            setTomboFim(livro.tombofim);
            setTitulo(livro.titulo);
            setAutor(livro.autor);
            setEditora(livro.editora);
            setAtivo(livro.ativo);

            setOpen(true);
            autoFocus()
        }
    }));


    useEffect(() => {
        if (!state.estaSalvandoLivro && !state.erroSalvandoLivro) {
            handleClose();
        }
    }, [state.estaSalvandoLivro, state.erroSalvandoLivro]);


    const handleClose = () => {
        setOpen(false);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        
        if (!Tombo || !TomboFim || !Titulo || !Autor || !Editora) {
            return false;
        }

        const livro = {
            id: ID,
            tombo: parseInt(Tombo),
            tombofim: parseInt(TomboFim),
            titulo: Titulo,
            autor: Autor,
            editora: Editora,
            ativo: Ativo
        }
        
        salvarLivro(dispatch, livro, mensagem);
    }

    const handleFullscreen = () => {
        setFullscreen(!fullscreen)
    }

    function autoFocus() {
        setTimeout(() => {
            if (Ativo) {
                document.getElementById("tombo").focus();
                document.getElementById("tombo").select();
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
            >
                <DialogTitle style={Ativo ? dialogFormEstilo : dialogFormExcluirEstilo} id="draggable-dialog-title" onFullscreen={handleFullscreen}>
                    {ID ? (Ativo ? state.legenda.editarLivro : state.legenda.excluirLivro) : state.legenda.adicionarLivro}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <Linha>
                            <EntradaTexto
                                id="tombo"
                                colunas="6"
                                rotulo={state.legenda.tombo}
                                valor={Tombo}
                                onChange={(e) => setTombo(e.target.value)}
                                nome="Tombo"
                                requerido={true}
                                somenteLeitura={!Ativo}
                                tipo="number"
                                //autoCompletar={false}
                            />
                            <EntradaTexto
                                id="tombofim"
                                colunas="6"
                                rotulo={state.legenda.tombofim}
                                valor={TomboFim}
                                onChange={(e) => setTomboFim(e.target.value)}
                                nome="TomboFim"
                                requerido={true}
                                somenteLeitura={!Ativo}
                                tipo="number"
                                //autoCompletar={false}
                            />
                            <EntradaTexto
                                id="titulo"
                                colunas="12"
                                rotulo={state.legenda.titulo}
                                valor={Titulo}
                                onChange={(e) => setTitulo(e.target.value)}
                                nome="Titulo"
                                requerido={true}
                                somenteLeitura={!Ativo}
                                //autoCompletar={false}
                            />
                            <EntradaTexto
                                id="autor"
                                colunas="12"
                                rotulo={state.legenda.autor}
                                valor={Autor}
                                onChange={(e) => setAutor(e.target.value)}
                                nome="Autor"
                                requerido={true}
                                somenteLeitura={!Ativo}
                                //autoCompletar={false}
                            />
                            <EntradaTexto
                                id="editora"
                                colunas="12"
                                rotulo={state.legenda.editora}
                                valor={Editora}
                                onChange={(e) => setEditora(e.target.value)}
                                nome="Editora"
                                requerido={true}
                                somenteLeitura={!Ativo}
                                //autoCompletar={false}
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
            {/* <TeclaPressionada 
                comandos={[
                    {tecla: state.teclaFechar, funcao: handleClose}
                ]}
            /> */}
        </div>
    )

})


export default LivroForm