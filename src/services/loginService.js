const LoginModel = require("../models/loginModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");

const loginModel = new LoginModel();

class LoginService {
  async teste(req, res) {
    // const [cliente] = (await loginModel.autenticar(req.body.dados)).rows;

    // const compareS = await bcrypt.compare(req.body.dados.senha, senhaHash);
    // console.log("senha Verificada ",compareS);

    try {
      const [email] = (await loginModel.autenticarEmail(req.body.dados.email))
        .rows;

      console.log(email.senha, " senha verificado");

      if (email) {
        const compareS = await bcrypt.compare(
          req.body.dados.senha,
          email.senha
        );
        console.log("log na senha digitada", req.body.dados.senha);

        console.log("log na senha retornada do email", compareS);

        if (compareS) {
          console.log("Senha Hash Confirmada");
        }

        if (email && compareS) {
          const token = jwt.sign(
            {
              id: email.id_cliente,
            },
            process.env.SECRET_PASS,
            { expiresIn: 2000 }
          );

          console.log("Token: ", token);

          const verifyToken = jwt.verify(token, process.env.SECRET_PASS);
          console.log("Verify Token: ", verifyToken);

          return res.status(200).json({ mensagem: "Usuario Enviado", token });
        } else {
          res.status(400).json({ mensagem: "Login Negado" });
        }
      }
    } catch (error) {
      console.error(error);
      res.status(400).json({ mensagem: "Login Negado" });
    }

    // console.log(cliente);
  }
}
module.exports = LoginService;
