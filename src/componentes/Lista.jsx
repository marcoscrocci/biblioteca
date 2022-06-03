import React, { useContext, useRef } from "react";
import GlobalContext from "../context/GlobalContext";
import Loader from "./Loader";
import Conteudo from "./Browser";
import Mensagem from './Mensagem';

function Lista(props) {
    const { state } = useContext(GlobalContext);
    const mensagem = useRef();
    return (
        <div>
            {(state.estaListando || state.estaSalvando) && <Loader />}
            <Conteudo>
                <div>
                    {props.children}
                </div>
                <Mensagem ref={mensagem} />
            </Conteudo>
        </div>
    );
}

export default Lista;
