const knex = require('../config/db/conexao');
const axios = require('axios');

const obterProdutos = async (req, res)=>{
    const {id} = req.params;
    try{

        if(id){
           
            const produto = await knex('produtos').where({ id }).first();

            if (!produto) {
                return res.status(404).json({ mensagem: "Não existe produto com o id informado" });
            }

            return res.status(200).json(produto);
        }
       
         const produtos = await knex.select('*').from('produtos');

         const usd = await axios.get(`https://economia.awesomeapi.com.br/all/USD`)
           .then( resp => {
               return resp.data
           })
          .catch((err)=>{
               return {menssage: "Ops! deu errado"};
          })


           const eur = await axios.get(`https://economia.awesomeapi.com.br/all/EUR`)
           .then( resp => {
               return resp.data
           })
          .catch((err)=>{
               return {menssage: "Ops! deu errado"};
          })


         let listaProdutos=[];
         for(const produto0 of produtos){
           let vetorProdutos ={
               produto:{
                    id: produto0.id,
                    nome: produto0.nome,
                    quantidade: produto0.quantidade,
                    descricao: produto0.descricao,
                    valor_produto_BRL: produto0.valor,
               cotacao:{
                    valor_produto_USD: (produto0.valor / usd.USD.bid).toFixed(2),
                    valor_produto_EUR: (produto0.valor / eur.EUR.bid).toFixed(2)
               }
               }

           }
           listaProdutos.push(vetorProdutos);
         }

          return res.status(200).json(listaProdutos);
    }catch(err){
          return res.status(404).json({mensagem: err.menssage})
    }
}

const cadastrarProduto = async (req, res) => {
    const { nome, quantidade, descricao, valor } = req.body;

    try {
      
        const produto = await knex('produtos').insert({nome, quantidade, descricao, valor}).returning('*');;

        if (!produto) {
            return res.status(400).json('O produto não foi cadastrado');
        }

        return res.status(201).json(produto);
    } catch (err) {
        return res.status(404).json({mensagem: err.menssage})
    }
}

module.exports = {
    obterProdutos, 
    cadastrarProduto
}