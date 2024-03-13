const VerificarChaveService = require("../services/VerificarChaveService");

const verificarChaveService = new VerificarChaveService();

class VerificarChaveController {
  chaveTelefone(req, res) {
    verificarChaveService.enviarChaveTelefone(req, res);
  }

  chaveEmail(req, res) {
    verificarChaveService.enviarChaveEmail(req, res);
  }

  chaveCpf(req, res) {
    verificarChaveService.enviarChaveCpf(req, res);
  }
}
module.exports = VerificarChaveController;
