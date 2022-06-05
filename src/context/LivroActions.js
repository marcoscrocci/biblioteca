import Api from '../Api';
import { actions as globalActions } from './GlobalActions';


export const actions = {
    ...globalActions,
}

export const listar = (dispatch, mensagemComponente) => {
    dispatch({ 
        type: 'listando'
    });

    Api.listar('livros')
    .then((lista) => {   
        dispatch({ 
            type: 'listados',
            livros: lista
        });
    })
    .catch((error) => {
        console.log('erro =', JSON.stringify(error));
        //alert(`Código: ${error.code} - Mensagem: ${error.message}`);
        dispatch({
            type: 'naoListados',
            payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', codigo: error.code, texto: error.message } }
        });
    });
}

export const salvar = (dispatch, objeto, mensagemComponente) => {
    
    dispatch({
        type: 'salvando'
    });
    
    Api.salvarLivro(objeto)
    .then((salvo) => {
        dispatch({ 
            type: 'salvo',
            payload: mensagemComponente
        });
    })
    .catch((error) => {
        console.log('erro =', JSON.stringify(error));
        //alert(`Código: ${error.code} - Mensagem: ${error.message}`);
        dispatch({
            type: 'naoSalvo',
            payload: { mensagemComponente, mensagemObjeto: { tipo: 'error', codigo: error.code, texto: error.message } }
        });
    });

}