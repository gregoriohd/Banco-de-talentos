const express = require('express');
const {
    obterCotacoes,
    obterCotacaoPorCodigo} = require('./controllers/currencys');

const rotas = express();

//currency
rotas.get('/currency', obterCotacoes);
rotas.get('/currency/:codigo', obterCotacaoPorCodigo);

//products


module.exports = rotas;