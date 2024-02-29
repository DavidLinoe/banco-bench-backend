const LoginModel = require("../models/loginModel");

const loginModel = new LoginModel();

class LoginService {
  async teste(req, res) {
    const [cliente] = (await loginModel.autenticar(req.body.dados)).rows;
    console.log(cliente);
    if (cliente) {
      res.status(200).json({ mensagem: "Login Efetuado", ...cliente });
    } else {
      res.status(400).json({ mensagem: "Login Negado" });
    }
  }
}
module.exports = LoginService;
