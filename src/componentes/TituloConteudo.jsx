import React, { useContext } from 'react'
import {
    Navbar,
    Nav,
    NavItem,
    NavbarBrand,
    Container
} from "reactstrap";
import Button from '@material-ui/core/Button';
import GlobalContext from '../context/GlobalContext'
import { botaoEstilo } from '../estilos'
import Icones from './Icones';


export default function TituloConteudo(props) {
    const { state } = useContext(GlobalContext)

    const onAtualizarClick = () => {
        props.botaoAtualizarClick && props.botaoAtualizarClick()
    }

    const onAdicionarClick = () => {
        props.botaoAdicionarClick && props.botaoAdicionarClick()
    }

    return (
        <section className='content-header'>
            <Navbar color="dark" dark>
                <Container>
                    <NavbarBrand href="#"><b>{props.titulo}</b></NavbarBrand>
                    <Nav>
                        <NavItem>
                            {props.botaoAtualizarClick && 
                                <Button
                                    style={botaoEstilo} 
                                    startIcon={<Icones icone='Atualizar' />} 
                                    variant="contained" 
                                    color="default" 
                                    onClick={onAtualizarClick} 
                                >
                                    {state.legenda.atualizar}
                                </Button>
                            }
                            {props.textoBotao && props.botaoAdicionarClick && 
                                <Button 
                                    variant="contained" 
                                    color="primary" 
                                    startIcon={<Icones icone='Adicionar' />} 
                                    style={botaoEstilo}
                                    onClick={onAdicionarClick}
                                >
                                    {props.textoBotao}
                                </Button>
                            }
                        </NavItem>
                    </Nav>
                </Container>
            </Navbar>
        </section>
    )
}
