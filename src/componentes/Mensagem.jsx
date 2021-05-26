import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));



const Mensagem = forwardRef((props, ref) => {

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [mensagemObjeto, setMensagemObjeto] = useState({ tipo: 'info', texto: null });

    useImperativeHandle(ref, () => ({
        mostrarMensagem(pMensagemObjeto) {
            setMensagemObjeto(pMensagemObjeto)
            setOpen(true);
        }
    }))


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };


    return (
        <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={props.tempo ? props.tempo : 5000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={mensagemObjeto.tipo}>
                    {mensagemObjeto.texto}
                </Alert>
            </Snackbar>
        </div>
    )
})

export default Mensagem