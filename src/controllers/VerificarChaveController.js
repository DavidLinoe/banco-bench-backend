const VerificarChaveService = require("../services/VerificarChaveService");

const verificarChaveService = new VerificarChaveService();

class VerificarChaveController {
  chave(req, res) {
    verificarChaveService.enviarChave(req, res);
  }
}
module.exports = VerificarChaveController;
