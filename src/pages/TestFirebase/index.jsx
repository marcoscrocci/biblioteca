import React from 'react';
import { useHistory } from "react-router-dom";
//import GlobalContext from '../../context/GlobalContext'
//import firebase from 'firebase/app';
//import 'firebase/firestore';
//import FirebaseClient from '../../FirebaseClient';
// import legendas from '../../recursos/legendas.json';
// import b64 from 'base-64';
import Api from '../../Api';

export default function TestFirebase(props) {
    //FirebaseClient();
    //const { state, dispatch } = useContext(GlobalContext);
    const history = useHistory();

    // const [Pontuacao, setPotuacao] = useState(null);
    // const [UsuarioAutenticado, setUsuarioAutenticado] = useState(null);
    // const [Funcionarios, setFuncionarios] = useState(null);
    // const [Languages, setLanguages] = useState(null);
    // const [Lista, setLista] = useState(null);
    // const [UsuarioDados, setUsuarioDados] = useState(null);


    const autenticarUsuario = async () => {
        console.log('Ponto 1');
        const email = "curso.firebase@gmail.com";
        const senha = "secret12345";
        const usuario = {
            email, 
            senha
        }
        Api.autenticarUsuario(usuario)
        .then((teste) => {
            console.log('then =', teste.email);
        })
        .catch((error) => {
            console.log('erro =', JSON.stringify(error));
            alert(`Código: ${error.code} - Mensagem: ${error.message}`);
        });
        console.log('Ponto 2');
    }

    const verificarUsuarioAutenticado = () => {
        Api.verificarUsuarioAutenticado();
    }

    const usuarioSair = () => {
        Api.usuarioSair();
    }

    const adicionarTeste = () => {
        Api.adicionarTeste();
    }

    const listarUsuarios = () => {
        Api.listarUsuarios();
    }

    /*
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
        //var languages = firebase.database().ref("languages");
        // languages.on('value', (snapshot) => {
        //     setLanguages(snapshot.val());
        // })
        //var legendas = firebase.database().ref("legendas")
        // firebase.database().ref("legendas").get().then((legendas) => {
        //     console.log('getLanguages =', JSON.parse(JSON.stringify(legendas)))
        //     setLanguages(legendas);    
        // })
        
        setLanguages(legendas);
        
        

    }

    const getLista = () => {
        var lista = firebase.database().ref("lista");
        lista.on('value', (snapshot) => {
            setLista(snapshot.val());
        })
    }



    useEffect(() => {
        const usuario = firebase.auth();
        const estadoAutenticacaoAlterado = usuario.onAuthStateChanged((usuarioAtual) => {
            setUsuarioAutenticado(usuarioAtual);
        })
        return () => estadoAutenticacaoAlterado();
    }, [])

    const usuarioSair = () => {
        const usuario = firebase.auth();
        usuario.signOut();
    }



    const getUsuario = () => {        
        const firebaseAuth = firebase.auth();
        const usuario = firebaseAuth.currentUser;
        let emailB64 = b64.encode(usuario.email);
        firebase.database().ref(`/usuarios/${emailB64}`)
        .on('value', snapshot => {
            setUsuarioDados(snapshot.val());
        });
        
        //console.log('usuarios =', JSON.stringify(JSON.parse(usuarios)));
        //console.log('autenticarUsuario - usuario =', usuario);

        
    }

    const createCollection = () => {
        //alert('teste');
    }
    */

    return (
        <div style={{ margin: 20 }}>
            <p>Teste do Firebase</p>
            {/* <p>Pontuação: {Pontuacao}</p>
            
            <p>Usuário Autenticado: {UsuarioAutenticado && UsuarioAutenticado.email}</p> */}
            <br />
            <button onClick={() => history.push('/')}>Principal</button>
            <br />
            <button onClick={() => autenticarUsuario()}>Usuário - Autenticar</button>            
            <br />
            <button onClick={() => verificarUsuarioAutenticado()}>Verificar Usuário Autenticado</button>
            <br />
            <button onClick={() => usuarioSair()}>Usuário - Sair</button>
            <br />
            <button onClick={() => adicionarTeste()}>Adicionar Teste</button>
            <br />
            <button onClick={() => listarUsuarios()}>Listar Usuários</button>
            
            {/* <button onClick={() => salvarDados()}>Salvar Dados</button>
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
            <button onClick={() => incluirPorJson()}>Gravar Idiomas</button>
            <br />
            <button onClick={() => incluirListaPorJson()}>Gravar Lista por Json</button>
            <br />
            <button onClick={() => getUsuario()}>Get Usuario</button>
            <br />
            <button onClick={() => createCollection()}>Criar Coleção</button> 
            <br />
            <br />
            <label>UsuarioDados:</label><br />
            <textarea 
                style={{ width: '70%', height: '200px' }} 
                readOnly={true}
                value={JSON.stringify(UsuarioDados, null, 4)} 
            />
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
            */}
        </div>
    )
}
