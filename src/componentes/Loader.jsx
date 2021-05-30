import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { CircularProgress } from '@material-ui/core';
//import GlobalContext from '../context/GlobalContext'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
    paper: {
        minWidth: '200px',
        minHeight: '180px',
        alignItems: 'center'
    }
}));

export default function FormDialog() {
    //const { state } = useContext(GlobalContext)
    const classes = useStyles();

    return (
        <div>
            <Dialog open={true} classes={{ paper: classes.paper }} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"></DialogTitle>
                <DialogContent>
                    <CircularProgress size="100px" />
                </DialogContent>
            </Dialog>
        </div>
    );
}
