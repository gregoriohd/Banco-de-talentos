const axios = require('axios');

const baseUrl = 'https://economia.awesomeapi.com.br/all/'


const obterCotacoes = (req, res)=>{

      const { codigo } = req.params;
      if(codigo){
          axios.get(`${baseUrl}${codigo}`)
          .then( resp => {
               return res.status(200).json(resp.data)})
          .catch((err)=>{
               return res.status(404).json({menssage: "Cotação não encontrada. Por favor verifique o codigo informado para continuar"});
          })
     }else{
          axios.get(baseUrl)
          .then(resp => {return res.status(200).json(resp.data)})
          .catch((err)=>{
               return res.status(500).json({menssage: "Ops! deu errado"});
          })
     }

  
};


module.exports ={
    obterCotacoes
}