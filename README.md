# Como baixar e executar o projeto Biblioteca

## `Baixar o projeto Biblioteca:`

#### `No terminal do sistema operacional digite ou copie o comando dentro de uma pasta de projetos da sua escolha em seu computador:`
git clone https://github.com/marcoscrocci/biblioteca.git

#### `Entre na pasta biblioteca que acabou de ser criada:` 
cd biblioteca

#### `Para prosseguir, você deve ter o Node.js instalado no seu computador.`
#### `Digite o comando abaixo para verificar se o Node.js está instalado:`
node --version

Caso não tenho o Node.js instalado no seu computador, visite o site:
https://nodejs.org/en/download/

#### `Já na pasta biblioteca, para baixar as dependencias do projeto, digite o comando:`
npm install

#### `Crie um projeto, um app e um banco de dados Firestore Database no site:`
https://console.firebase.google.com

Obs.: Basta ter uma conta na Google e um plano Spark, que é gratuíto.

<p>Ainda no site do Firebase, habilite a autenticação por E-mail/senha e crie um usuário, para ser administrador, diretamente no site.
Crie no banco de dados Firestore uma coleção "usuarios" e um novo documento com os campos e valores abaixo: </p>

`administrador:` true <br />
`ativo:` true <br />
`email:` administrador@gmail.com (o mesmo criado no Authentication) <br />
`nome:` Administrador <br />

No Cloud Firestore, crie a regra:

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}


#### `No diretório raíz do projeto, crie um arquivo chamado .env com as configurações geradas no projeto do Firebase (Web App):`
/.env<br />
REACT_APP_API_KEY=<valor de apiKey><br />
REACT_APP_AUTH_DOMAIN=<valor de authDomain><br />
REACT_APP_PROJECT_ID=<valor de projectId><br />
REACT_APP_STORAGE_BUCKET=<valor de storageBucket><br />
REACT_APP_MESSAGING_SENDER_ID=<valor de messagingSenderId><br />
REACT_APP_APP_ID=<valor de appId><br />
REACT_APP_MEASUREMENT_ID=<valor de measurementId><br />

#### `Execute o comando abaixo para criar novas chaves secretas:`
node criarChaves.js

#### `Adicione as duas novas chaves abaixo no arquivo .env com os valores gerados pelo comando anterior:`
REACT_APP_CHAVE_CRIPTOGRAFIA=<br />
REACT_APP_IV_PASS=<br />

## `Executar o projeto Biblioteca:`

#### `Digite o comando:`
npm start

## `Quer saber como publicar uma aplicação React.js no Firebase Hosting? Acesse:`
https://github.com/marcoscrocci/reactjs-deploy-firebase



