import React, { useContext } from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import MuiAccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GlobalContext from '../context/GlobalContext'

const Accordion = withStyles({
    root: {
        //border: '1px solid rgba(0, 0, 0, .125)',
        //background: '#353a3f',
        //color: 'white',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
    root: {
        //backgroundColor: '#353a3f', //'rgba(0, 0, 0, .03)',
        borderBottom: '1px solid rgba(0, 0, 0, .125)',
        marginBottom: -1,
        minHeight: 56,
        '&$expanded': {
            minHeight: 56,
        },
    },
    content: {
        '&$expanded': {
            margin: '12px 0',
        },
    },
    expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiAccordionDetails);

export default function MenuTree(props) {
    const { state } = useContext(GlobalContext)

    return (
        <div>
            <Accordion square>
                <AccordionSummary 
                    expandIcon={state.barraLateral && <ExpandMoreIcon className='acordeao-expend-icon' />} 
                    aria-controls="panel1d-content" id="panel1d-header"
                >
                    <Typography>
                        <i className={`${props.icone}`}></i>
                        {state.barraLateral && 
                            <div className='menu-item-descricao'>{props.descricao}</div>
                        }
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        {props.children}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

