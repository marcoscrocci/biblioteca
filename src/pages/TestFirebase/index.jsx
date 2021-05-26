import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
//import GlobalContext from '../../context/GlobalContext'
import firebase from 'firebase/app';
import FirebaseClient from '../../FirebaseClient'

export default function TestFirebase(props) {
    FirebaseClient();
    //const { state, dispatch } = useContext(GlobalContext);
    const history = useHistory();

    const [Pontuacao, setPotuacao] = useState(null);
    const [UsuarioAutenticado, setUsuarioAutenticado] = useState(null);
    const [Funcionarios, setFuncionarios] = useState(null);
    const [Languages, setLanguages] = useState(null);
    const [Lista, setLista] = useState(null);

    const salvarDados = () => {
        //alert("Salvar Dados");
        var database = firebase.database();
        database.ref("pontuacao").set("200");
    }

    const removerDados = () => {
        //alert("Salvar Dados");
        var database = firebase.database();
        database.ref("pontuacao").remove();
    }

    const salvarDadosFuncionario = () => {
        var funcionarios = firebase.database().ref("funcionarios");
        const func001 = funcionarios.child("001")
        func001.child("nome").set("Marcos");
        func001.child("dataNasc").set("1977-09-06");
        const func002 = funcionarios.child("002")
        func002.child("nome").set("Fabiana");
        func002.child("dataNasc").set("1975-02-09");
    }

    const removerDadosFuncionario = () => {
        var funcionarios = firebase.database().ref("funcionarios");
        const func001 = funcionarios.child("001")
        func001.remove();
        const func002 = funcionarios.child("002")
        func002.remove();
        //ou para remover todos:
        //funcionarios.remove();
    }

    const incluirFuncionario = () => {
        var funcionarios = firebase.database().ref("funcionarios");
        const novoFuncionario = funcionarios.push();
        novoFuncionario.child("nome").set("Ana")
        novoFuncionario.child("dataNasc").set("2008-10-01");
    }

    const incluirFuncionarioPorJson = () => {
        var funcionarios = firebase.database().ref("funcionarios");
        funcionarios.push().set(
            {
                nome: "Davi",
                dataNasc: "1942-09-19"
            }
        )
    }

    const incluirPorJson = () => {
        var languages = firebase.database().ref("languages");
        const english = languages.child("English");
        const portuguese = languages.child("Portuguese");

        english.set(
            {
                code: "en",
                english: "English",
                portuguese: "Portuguese",
                system: "System",
                cancel: "Cancel"
            }
        );
        portuguese.set(
            {
                code: "pt-BR",
                english: "Inglês",
                portuguese: "Português",
                system: "Sistema",
                cancel: "Cancelar"
            }
        );

        const languageName = "Spanish";
        const newLanguage = languages.child(languageName);
        newLanguage.set(
            {
                code: "es",
                english: "Inglés",
                portuguese: "Portugués",
                system: "Sistema",
                cancel: "Cancelar"
            }
        );
    }

    const incluirListaPorJson = () => {
        var lista = firebase.database().ref("lista");
        const itens = [];
        for (var i = 0; i < 10; i++) {
            const id = i;
            const descricao = `Teste${i.toString()}`;
            const item = {id, descricao};
            itens.push(item);
        }
        lista.set(itens);
    }

    const cadastrarUsuario = () => {
        var email = "curso.firebase@gmail.com";
        var senha = "secret12345";
        const usuario = firebase.auth();
        usuario.createUserWithEmailAndPassword(email, senha)
            .then(() => {
                alert("Usuário criado com sucesso!");
            })
            .catch((error) => {
                alert(`Código: ${error.code} - Mensagem: ${error.message}`);
            });
    }


    const listarDados = () => {
        var pontuacao = firebase.database().ref("pontuacao");
        var funcionarios = firebase.database().ref("funcionarios");
        // Olha como o Firebase é incrível, podemos...
        // Criar um método de escuta, para quando os dados do Firebase for alterados
        // Não precisa fazer uma nova requisição no banco, o banco que avisa o cliente, olha eu fui 
        // alterado, então o cliente se atualiza. Shoooooowwww!!!!!
        pontuacao.on('value', (snapshot) => {
            setPotuacao(snapshot.val());
        })
        funcionarios.on('value', (snapshot) => {
            setFuncionarios(snapshot.val());
        });
        getLista();
    }

    const getLanguages = () => {
        var languages = firebase.database().ref("languages");
        languages.on('value', (snapshot) => {
            setLanguages(snapshot.val());
        })
    }

    const getLista = () => {
        var lista = firebase.database().ref("lista");
        lista.on('value', (snapshot) => {
            setLista(snapshot.val());
        })
    }

    const verificarUsuarioAutenticado = () => {
        const usuario = firebase.auth();
        const usuarioAtual = usuario.currentUser;
        if (usuarioAtual) {
            alert(JSON.stringify(usuarioAtual));
        } else {
            alert("Não há usuários autenticados no Firebase!");
        }
    }

    useEffect(() => {
        const usuario = firebase.auth();
        usuario.onAuthStateChanged((usuarioAtual) => {
            setUsuarioAutenticado(usuarioAtual);
        })
    }, [])

    const usuarioSair = () => {
        const usuario = firebase.auth();
        usuario.signOut();
    }

    const autenticarUsuario = () => {
        var email = "curso.firebase@gmail.com";
        var senha = "secret12345";
        const usuario = firebase.auth();
        usuario.signInWithEmailAndPassword(email, senha)
            .then(() => {
                alert("Usuário autenticado com sucesso!");
            })
            .catch((error) => {
                alert(`Código: ${error.code} - Mensagem: ${error.message}`);
            });
    }


    return (
        <div style={{ margin: 20 }}>
            <p>Teste do Firebase</p>
            <p>Pontuação: {Pontuacao}</p>
            
            <p>Usuário Autenticado: {UsuarioAutenticado && UsuarioAutenticado.email}</p>
            <button onClick={() => salvarDados()}>Salvar Dados</button>
            <br />
            <button onClick={() => removerDados()}>Remover Dados</button>
            <br />
            <button onClick={() => salvarDadosFuncionario()}>Salvar Dados Funcionario</button>
            <br />
            <button onClick={() => removerDadosFuncionario()}>Remover Dados Funcionario</button>
            <br />
            <button onClick={() => incluirFuncionario()}>Incluir Funcionario com identificador único</button>
            <br />
            <button onClick={() => incluirFuncionarioPorJson()}>Incluir Funcionario com JSON</button>
            <br />
            <button onClick={() => listarDados()}>Listar Dados</button>
            <br />
            <button onClick={() => getLanguages()}>Get Languages</button>
            <br />
            <button onClick={() => cadastrarUsuario()}>Criar Usuário</button>
            <br />
            <button onClick={() => verificarUsuarioAutenticado()}>Verificar Usuário Autenticado</button>
            <br />
            <button onClick={() => usuarioSair()}>Usuário - Sair</button>
            <br />
            <button onClick={() => autenticarUsuario()}>Usuário - Autenticar</button>
            <br />
            <button onClick={() => incluirPorJson()}>Gravar Idiomas</button>
            <br />
            <button onClick={() => incluirListaPorJson()}>Gravar Lista por Json</button>
            <br />
            <button onClick={() => history.push('/')}>Principal</button>
            <br />
            <hr />
            <br />
            <label>Funcionários:</label><br />
            <textarea 
                style={{ width: '70%', height: '200px' }} 
                readOnly={true}
                value={JSON.stringify(Funcionarios, null, 4)} 
            />
            <br />
            <br />
            <label>Languages:</label><br />
            <textarea 
                style={{ width: '70%', height: '200px' }} 
                readOnly={true}
                value={JSON.stringify(Languages, null, 4)} 
            />
            <br />
            <br />
            <label>Lista:</label><br />
            <textarea 
                style={{ width: '70%', height: '200px' }} 
                readOnly={true}
                value={JSON.stringify(Lista, null, 4)} 
            />
        </div>
    )
}
