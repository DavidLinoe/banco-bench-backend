const PerfilService = require("./../services/perfilService");
const perfilService = new PerfilService();

class PerfilController {
  perfil(req, res) {
    perfilService.dadosCliente(req, res);
  }
  perfilNovo(req, res) {
    perfilService.dadosClienteNovo(req, res);
  }
  perfilSenha(req, res) {
    perfilService.dadosSenha(req, res);
  }
}

module.exports = PerfilController;
