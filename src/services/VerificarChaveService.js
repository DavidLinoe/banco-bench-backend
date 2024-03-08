const  VerificarChaveModel = require("../models/VerificarChaveModel");

const  verificarChaveModel = new  VerificarChaveModel();

class VerificarChaveService {
  async enviarChave(req, res) {
    const [chaveR] = (await verificarChaveModel.autenticar(req.body.dadosChave)).rows;

    console.log("Log no Service, req.body.. " , req.body.dadosChave);
    console.log("Log no Service " , chaveR);
    if (chaveR) {
      res.status(200).json({ mensagem: "Chave Existe", ...chaveR });
    } else {
      res.status(400).json({ mensagem: "Chave Não Existe" });
    }

  }
}



module.exports = VerificarChaveService;
