const express = require('express');
const {
    obterCotacoes,
    obterCotacaoPorCodigo} = require('./controllers/currencys');
const { obterProdutos } = require('./controllers/products');

const rotas = express();

//currency
rotas.get('/currency', obterCotacoes);
rotas.get('/currency/:codigo', obterCotacaoPorCodigo);

//products
rotas.get('/products', obterProdutos);

module.exports = rotas;