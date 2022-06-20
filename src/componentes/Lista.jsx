import React, { useContext, useRef } from "react";
import GlobalContext from "../context/GlobalContext";
import Loader from "./Loader";
import Conteudo from "./Browser";
import Mensagem from './Mensagem';
import Linha from "./Linha";
import Grade from "./Grade";
import MaterialTable from 'material-table'
import { localization, materiaTableOptions } from '../estilos'
//import { Edit, Delete, Add, Refresh, Print } from "@material-ui/icons";
import { Refresh, Add, Edit, Delete } from "@material-ui/icons";

function Lista(props) {
    const { dispatch, state } = useContext(GlobalContext);
    const mensagem = useRef();

    const atualizar = () => {
        props.listar && props.listar(dispatch, mensagem, state.legenda);
    }

    const adicionar = () => {
        props.adicionar && props.adicionar();
    }

    const editar = (event, rowData) => {
        props.editar && props.editar(rowData);
    }

    const excluir = (event, rowData) => {
        props.excluir && props.excluir(rowData);
    }

    return (
        <div>
            {(state.estaListando || state.estaSalvando) && <Loader />}
            <Conteudo>
                <div>
                    {props.children}
                </div>
                <Linha>
                    <Grade colunas="12">
                        <MaterialTable
                            title={props.titulo}
                            columns={props.tabColunas}
                            localization={localization}
                            data={props.dados}
                            options={materiaTableOptions}
                            actions={[
                                {
                                    icon: () => <Edit color="primary" />,
                                    tooltip: "Editar",
                                    onClick: editar
                                },
                                {
                                    icon: () => <Delete color="secondary" />,
                                    tooltip: "Excluir",
                                    onClick: excluir
                                },
                                {
                                    icon: () => <Refresh color="primary" />,
                                    tooltip: state.legenda.atualizar,
                                    isFreeAction: true,
                                    onClick: atualizar
                                },
                                {
                                    icon: () => <Add color="primary" />,
                                    tooltip: state.legenda.adicionar,
                                    isFreeAction: true,
                                    onClick: adicionar
                                }
                            ]}
                        />
                    </Grade>
                </Linha>
                <Mensagem ref={mensagem} />
            </Conteudo>
        </div>
    );
}

export default Lista;
