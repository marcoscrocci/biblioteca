import React, { forwardRef, useState, useRef, useContext, useImperativeHandle, useEffect } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { Fullscreen } from '@material-ui/icons'
import Draggable from 'react-draggable';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import GlobalContext from '../../context/GlobalContext'
import Dialog from '@material-ui/core/Dialog';
import { botaoEstilo, dialogFormEstilo, dialogFormExcluirEstilo } from '../../estilos';
import DialogContent from '@material-ui/core/DialogContent';
import Linha from '../../componentes/Linha';
import Button from '@material-ui/core/Button';
import Icones from '../../componentes/Icones';
import DialogActions from '@material-ui/core/DialogActions';
import Mensagem from '../../componentes/Mensagem';

const styles = theme => ({
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

const Form = forwardRef((props, ref) => {
    const { state, dispatch } = useContext(GlobalContext);
    const [open, setOpen] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const mensagem = useRef();
    const [objeto, setObjeto] = useState({});
    

    useImperativeHandle(ref, () => ({
        abrirForm(objeto, controleInicial) {
            setObjeto(objeto);

            setOpen(true);
            autoFocus(controleInicial);
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

        //*** Como consistir os campos obrigatórios?

        //*** Como preencher o objeto com os valores dos campos?

        props.salvar && props.salvar(objeto);
    }

    const handleFullscreen = () => {
        setFullscreen(!fullscreen)
    }

    function autoFocus(controle) {
        setTimeout(() => {
            if (objeto.Ativo && controle) {
                document.getElementById(controle).focus();
                document.getElementById(controle).select();
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
                <DialogTitle style={objeto.Ativo ? dialogFormEstilo : dialogFormExcluirEstilo} id="draggable-dialog-title" onFullscreen={handleFullscreen}>
                    {objeto.ID ? (objeto.Ativo ? props.editarObjeto : props.excluirObjeto) : state.legenda.adicionarObjeto}
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <Linha>
                            {props.children}
                        </Linha>
                        <div>            
                            <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                style={botaoEstilo}
                                startIcon={<Icones icone={objeto.Ativo ? 'Salvar': 'Excluir'} />}
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
    );
    

});

export default Form;