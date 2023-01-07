const axios = require('axios');

const baseUrl = 'https://economia.awesomeapi.com.br/all/'


const obterCotacoes = (req, res)=>{
   axios.get(baseUrl)
   .then(resp => {return res.status(200).json(resp.data)})
   .catch((err)=>{
        return res.status(500).json({menssage: "Ops! deu errado"});
   })
};

const obterCotacaoPorCodigo = (req, res)=>{
    const { codigo } = req.params;
    axios.get(`${baseUrl}${codigo}`)
   .then( resp => {
     return res.status(200).json(resp.data)})
   .catch((err)=>{
        return res.status(404).json({menssage: "Cotação não encontrada. Por favor verifique o codigo informado para continuar"});
   })
   
};

module.exports ={
    obterCotacoes,
    obterCotacaoPorCodigo
}