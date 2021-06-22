//const crypto = require('crypto')
//const moment = require('moment');
//const algoritmo = 'aes-256-ctr'
//const { chave_criptografia, ivPass, ajustarFusoHorario, fusoHorarioMoment } = require('./config')
//const { isBrowser, isMobile, isTablet, isSmartTV } = require('react-device-detect')

export function guardar(chave, objeto) {
	localStorage.setItem(chave, JSON.stringify(objeto))
}

export function recuperar(chave) {
	return JSON.parse(localStorage.getItem(chave))
}

export function remover(chave) {
	localStorage.removeItem(chave)
}

export function mostrarMensagem(msg, state) {
	if (msg) {
		const { mensagemComponente, mensagemObjeto } = msg;
		let { tipo, titulo, codigo, texto } = mensagemObjeto;
		if (codigo) {
			texto = traduzirMensagem(codigo, texto, state);
		}
		if (mensagemComponente && mensagemComponente.current) {
			mensagemComponente.current.mostrarMensagem({
				tipo,
				titulo,
				texto
			})
		}
	}
}

export function traduzirMensagem(codigo, texto, state) {
	switch (codigo) {
		case "auth/wrong-password": 
			return state.legenda.usuarioSenhaInvalidos; //"Usuário e/ou senha inválido(s)";
		case "auth/user-not-found":
			return state.legenda.usuarioSenhaInvalidos; //"Usuário e/ou senha inválido(s)";
		case "auth/too-many-requests":
			return state.legenda.acessoContaTemporariamenteDesativada; // "O acesso a esta conta foi temporariamente desativado devido a muitas tentativas de login malsucedidas. Você pode restaurá-lo imediatamente redefinindo sua senha ou pode tentar novamente mais tarde.";
		case "auth/email-already-in-use":
			return state.legenda.emailEmUso; //"O endereço de e-mail já está sendo usado por outra conta.";
		case "auth/invalid-email":
			return state.legenda.emailInvalido;
		case "auth/user-info-not-found":
			return state.legenda.informacoesUsuarioNaoEncontrada;
		case "auth/error-get-user-info":
			return state.legenda.erroObterInformacoesUsuario;
		case "auth/error-user-auth":
			return state.legenda.erroAutenticacaoUsuario;
		case "auth/error-get-user-list":
			return state.legenda.erroListarUsuarios;
		case "auth/error-update-user":
			return state.legenda.erroAtualizarUsuario;
		case "auth/error-add-user":
			return state.legenda.erroAdicionarUsuario;
		case "auth/user-disabled":
			return state.legenda.erroUsuarioDesabilitado;
		case "book/error-get-book-list":
			return state.legenda.erroListarLivros;
		case "book/error-update-book":
			return state.legenda.erroAtualizarLivro;
		case "book/error-add-book":
			return state.legenda.erroAdicionarLivro;
		default:
			return texto;
	}
} 

export function sleep(milliseconds) {
	const date = Date.now();
	let currentDate = null;
	do {
		currentDate = Date.now();
	} while (currentDate - date < milliseconds);
}

export function objetosParaLista(objetos) {
	// Converter uma lista do formato Firebase para uma lista no formato de Array do JavaScript
	let lista = [];
	if (objetos) {
		lista = Object.keys(objetos).map(id => {
			let objeto = objetos[id];
			objeto.id = id;
			return objeto
		});
	};
	return lista;
}

/*
export function criptografar(texto) {
	const key = Buffer.from(chave_criptografia, 'hex')
	const iv = Buffer.from(ivPass, 'hex')

	const cipher = crypto.createCipheriv(algoritmo, key, iv)
	let encriptado = cipher.update(texto)
	encriptado = Buffer.concat([encriptado, cipher.final()])

	return encriptado.toString('hex');
}

export function descriptografar(texto) {
	const key = Buffer.from(chave_criptografia, 'hex')
	const iv = Buffer.from(ivPass, 'hex')
	let encriptado = Buffer.from(texto, 'hex')
	const decipher = crypto.createDecipheriv(algoritmo, key, iv)
	let descriptado = decipher.update(encriptado)
	descriptado = Buffer.concat([descriptado, decipher.final()])

	return descriptado.toString()
}


export function detectar_mobile() {
	var check = false; //wrapper no check
	(function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true })(navigator.userAgent || navigator.vendor || window.opera);
	return check;
}

export function inputClassName(erro) {
	return erro ? 'form-control entrada-texto-erro' : 'form-control'
}

export function checkInputClassName(erro) {
	return erro ? 'form-group entrada-texto-erro' : 'form-group'
}

export function telefoneValido(telefone) {
	const regexTelefone = /(\(?\d{2}\)?\s)?(\d{4,5}\-?\d{4})/g;
	return regexTelefone.test(telefone)
}

export function cnpjValido(s) {
	if (!s) return true
	let cnpj = s.replace(/[^\d]+/g, '')

	// Valida a quantidade de caracteres
	if (cnpj.length !== 14)
		return false

	// Elimina inválidos com todos os caracteres iguais
	if (/^(\d)\1+$/.test(cnpj))
		return false

	// Cáculo de validação
	let t = cnpj.length - 2,
		d = cnpj.substring(t),
		d1 = parseInt(d.charAt(0)),
		d2 = parseInt(d.charAt(1)),
		calc = x => {
			let n = cnpj.substring(0, x),
				y = x - 7,
				s = 0,
				r = 0

			for (let i = x; i >= 1; i--) {
				s += n.charAt(x - i) * y--;
				if (y < 2)
					y = 9
			}

			r = 11 - s % 11
			return r > 9 ? 0 : r
		}

	return calc(t) === d1 && calc(t + 1) === d2
}
*/



/*
export function dataAtual() {
	const fusoHorario = ajustarFusoHorario
	return moment(new Date()).add(fusoHorario, 'hours').toDate()
}


export function dataValidadeSenha() {
	// Quando o usuário estiver com a validade da senha vencida e trocar, 
	// aumentar 10 dias para não aparecer a tela de alterar senha novamente, 
	// mas os dias de validade adicionados na alteração de senha está definado
	// no backend, no arquivo .env.
	return moment(new Date()).add(10, 'days').toDate()
}

export function dataHoraString(dataHora, formato = 'YYYY-MM-DD HH:mm:ss') {
	return moment(dataHora).add(fusoHorarioMoment, 'hours').format(formato)
}


export function dataHoraFusoHorario(dataHora) {
	const fusoHorario = ajustarFusoHorario
	return moment(dataHora).add(fusoHorario, 'hours')
}


export function dataAtualString() {
	return moment().format('YYYY-MM-DD')
}


export function jsonDateToDateTime(jsonDate) {
	return new Date(parseInt(jsonDate.replace("/Date(", "").replace(")/", ""), 10))
}

export function dateTimeToSQLDate(dateTime) {
	return moment(dateTime).format('YYYY-MM-DD HH:mm:ss')
}

export function temAcesso(caminho, state, dispatch, history, sairUsuario) {
	const menu = state.menu ? state.menu : []
	const acessoMenu = menu.find(m => m.Caminho === caminho)
	if (!acessoMenu) {
		//localStorage.removeItem('dashboard_usuario')
		//localStorage.removeItem('dashboard_manterConectado')
		history.push('/')
		sairUsuario(dispatch)
	}
}


export function criarAudio(arquivo) {
	var audio
	if (arquivo.substr(0, 4) === 'http') {
		audio = arquivo
	} else {
		audio = require(`./recursos/audios/${arquivo}`)
	}
	return audio
}


export function tipoDispositivo() {
	return isBrowser ? 'Browser' : isMobile ? 'Mobile' : isTablet ? 'Tablet' : isSmartTV ? 'Smart TV' : 'Outro'
}

export function descricaoOrdenar(lista) {
	return lista.sort((a, b) => (retirarAcentos(a.descricao) < retirarAcentos(b.descricao)) ? -1 : (retirarAcentos(a.descricao) > retirarAcentos(b.descricao)) ? 1 : 0)
}

export function retirarAcentos(str) {

	const com_acento = "ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ";
	const sem_acento = "AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr";

	let novastr = "";
	for (let i = 0; i < str.length; i++) {
		let troca = false;
		for (let a = 0; a < com_acento.length; a++) {
			if (str.substr(i, 1) === com_acento.substr(a, 1)) {
				novastr += sem_acento.substr(a, 1);
				troca = true;
				break;
			}
		}
		if (troca === false) {
			novastr += str.substr(i, 1);
		}
	}
	return novastr;
}       

*/