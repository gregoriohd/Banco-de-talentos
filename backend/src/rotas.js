const express = require('express');
const {
    obterCotacoes} = require('./controllers/currencys');
const { obterProdutos, cadastrarProduto } = require('./controllers/products');

const rotas = express();

//currency
rotas.get('/currency', obterCotacoes);
rotas.get('/currency/:codigo', obterCotacoes);

//products
rotas.get('/products', obterProdutos);
rotas.get('/products/:id', obterProdutos);
rotas.post('/products', cadastrarProduto);

module.exports = rotas;