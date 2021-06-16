import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID
};


const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

const metodos = {
    autenticarUsuario: async () => {
        var email = "curso.firebase@gmail.com";
        var senha = "secret12345";
        const usuario = firebaseApp.auth();
        usuario.signInWithEmailAndPassword(email, senha)
        .then(() => {
            alert("Usuário autenticado com sucesso!");
        })
        .catch((error) => {
            alert(`Código: ${error.code} - Mensagem: ${error.message}`);
        });
    },
    verificarUsuarioAutenticado: async () => {
        const usuario = firebaseApp.auth();
        const usuarioAtual = usuario.currentUser;
        if (usuarioAtual) {
            alert(JSON.stringify(usuarioAtual));
        } else {
            alert("Não há usuários autenticados no Firebase!");
        }
    },
    usuarioSair: async () => {
        const usuario = firebaseApp.auth();
        usuario.signOut();
    },
    adicionarTeste: async () => {
        await db.collection('teste').doc().set({
            nome: "Teste da Silva",
            idade: 33
        });
        alert('adicionarTeste');
    }
}

export default metodos;
