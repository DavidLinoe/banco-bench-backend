const LoginModel = require("../models/loginModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginModel = new LoginModel();

class LoginService {
  async teste(req, res) {
    const [cliente] = (await loginModel.autenticar(req.body.dados)).rows;
    console.log(cliente);
    if (cliente) {
      const token = jwt.sign(
        {
          id: cliente.id_cliente,
        },
        process.env.SECRET_PASS,
        { expiresIn: 500 }
      );

      console.log("Token: ", token);

      const verifyToken = jwt.verify(token, process.env.SECRET_PASS);
      console.log("Verify Token: ", verifyToken);

      return res.status(200).json({ mensagem: "Usuario Enviado", token });
    } else {
      res.status(400).json({ mensagem: "Login Negado" });
    }
  }
}
module.exports = LoginService;
