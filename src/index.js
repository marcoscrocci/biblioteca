import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { GlobalProvider } from "./context/GlobalContext";
import LoginOuAplicacao from './LoginOuAplicacao'
import "./estilos.css";

ReactDOM.render(
    <React.StrictMode>
        <GlobalProvider>
            <LoginOuAplicacao />
        </GlobalProvider>
    </React.StrictMode>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
