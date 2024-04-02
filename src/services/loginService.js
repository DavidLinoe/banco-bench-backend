const LoginModel = require("../models/loginModel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer")
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

  //  var nodemailer = require('nodemailer');

  //* var transporter = nodemailer.createTransport({
  //*    //? service: 'gmail',
  //*    host: "smtp.gmail.com",
  //*    port: 587,
  //*    auth: {
  //*    user: 'bancobenchbrasil@gmail.com',
  //*    pass: 'bancobench123$'
  //* }
  //*});

  //!var transporter = nodemailer.createTransport({
  //!  host: "live.smtp.mailtrap.io",
  //!  port: 587,
  //!  auth: {
  //!    user: "api",
  //!    pass: "fdfa36c1a56e8dffc0fd8eaf7c4256a1"
  //!  }
  //!});

//todo  var transporter = nodemailer.createTransport({
//todo    host: "sandbox.smtp.mailtrap.io", //!sandbox
//todo    port: 2525,
//todo    auth: {
//todo      user: "7b23473d2a1597",
//todo      pass: "38f304e8c5d596"
//todo    }
//todo  });

//todo   var mailOptions = {
//todo     from: 'bancobenchbrasil@gmail.com',
//todo     to: 'david@gmail.com',
//todo     subject: 'Alteração De Senha Bench',
//todo     html: '<h1>Sua nova senha é </h1><br><p>2AF5&%2345</p><br>você poderá alterar depois<a href="http://localhost:4200/" >logar com nova senha!</a>'
//todo   };

//todo   transporter.sendMail(mailOptions, function(error, info){
//todo     if (error) {
//todo       console.log(error);
//todo     } else {
//todo       console.log('Email sent: ' + info.response);
//todo     }
//todo   });





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
