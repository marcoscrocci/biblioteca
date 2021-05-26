import React from 'react';
import { useHistory } from "react-router-dom";
//import GlobalContext from '../../context/GlobalContext'


export default function Main (props) {
    //const { state, dispatch } = useContext(GlobalContext);
    const history = useHistory();
    

    return (
        <div>
            <p>Principal</p>
            <button onClick={() => history.push('/testfirebase')}>Teste Firebase</button>
            <br />
        </div>
    )
}