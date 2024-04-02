const RecuperarService = require("./../services/recuperarService");

const recuperarService = new RecuperarService();

class RecuperarController {
  dados(req, res) {
    recuperarService.verificarDados(req, res);
  }
}

module.exports = RecuperarController;
