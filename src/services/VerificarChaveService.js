const  VerificarChaveModel = require("../models/VerificarChaveModel");

const  verificarChaveModel = new  VerificarChaveModel();

class VerificarChaveService {
  async enviarChaveTelefone(req, res) {
    const [chaveTelefone] = (await verificarChaveModel.autenticarSenha(req.body.dadosChave)).rows;

    // console.log("Log no Service, req.body.. " , req.body.dadosChave);
    console.log("Log no Service " , chaveTelefone);
    if (chaveTelefone) {
      res.status(200).json({ mensagem: "Chave Telefone", ...chaveTelefone });
    } else {
      res.status(400).json({ mensagem: "Chave Não Existe" });
    }

  }

  async enviarChaveEmail(req, res) {
    const [chaveEmail] = (await verificarChaveModel.autenticarEmail(req.body.dadosChave)).rows;

    // console.log("Log no Service, req.body.. " , req.body.dadosChave);
    console.log("Log no Service " , chaveEmail);
    if (chaveEmail) {
      res.status(200).json({ mensagem: "Chave Email", ...chaveEmail });
    } else {
      res.status(400).json({ mensagem: "Chave Não Existe" });
    }

  }

  async enviarChaveCpf(req, res) {
    const [chaveCpf] = (await verificarChaveModel.autenticarCpf(req.body.dadosChave)).rows;

    // console.log("Log no Service, req.body.. " , req.body.dadosChave);
    console.log("Log no Service " , chaveCpf);
    if (chaveCpf) {
      res.status(200).json({ mensagem: "Chave Email", ...chaveCpf });
    } else {
      res.status(400).json({ mensagem: "Chave Não Existe" });
    }

  }
}



module.exports = VerificarChaveService;
