// Para gerar uma key e iv novo
const crypto = require('crypto');
const CHAVE_CRIPTOGRAFIA = crypto.randomBytes(32).toString('hex');  // REACT_APP_CHAVE_CRIPTOGRAFIA
const IV_PASS = crypto.randomBytes(16).toString('hex');   // REACT_APP_IV_PASS

console.log('CHAVE_CRIPTOGRAFIA: ', CHAVE_CRIPTOGRAFIA);
console.log('IV_PASS: ', IV_PASS);

