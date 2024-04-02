const RecuperarModel = require("./../models/RecuperarModel");
const nodemailer = require("nodemailer");
const bcrypt = require("bcrypt");
const axios = require("axios");

const recuperarModel = new RecuperarModel();

class RecuperarService {
  async verificarDados(req, res) {
    const usuario = (await recuperarModel.verificarDados(req.body.dados)).rows;

    if (usuario) {
      // "$2b$10$4JnQ5hZQPGBSy3gCDaaPMuDdXHkfBV8KZLTmUwEJPuqrrlmZF5.2W"
      function gerarSenha(tamanho) {
        const caracteres =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let senha = "";
        for (let i = 0; i < tamanho; i++) {
          const indice = Math.floor(Math.random() * caracteres.length);
          senha += caracteres.charAt(indice);
        }
        return senha;
      }

      const tamanhoSenha = 10;
      const senhaAleatoria = gerarSenha(tamanhoSenha);
      console.log("Senha aleatória: ", senhaAleatoria);

      const randomSalt = 10;
      const senhaHash = await bcrypt.hash(senhaAleatoria, randomSalt);
      console.log("senha Depois do hash ! ", senhaHash);

      const senhaNova = await recuperarModel.verificarDados(
        req.body.dados,
        senhaHash
      ).rows;

      try {
        senhaNova;

        const senhaNovaHash = await recuperarModel.atualizarSenha(
          req.body.dados,
          senhaHash
        ).rows;
        senhaNovaHash;

        //     var transporter = nodemailer.createTransport({
        //       host: "sandbox.smtp.mailtrap.io", //!sandbox
        //       port: 2525,
        //       auth: {
        //         user: "7b23473d2a1597",
        //         pass: "38f304e8c5d596",
        //       },
        //     });

        //     var mailOptions = {
        //       from: "bancobenchbrasil@gmail.com",
        //       to: req.body.dados.email,
        //       subject: "Alteração De Senha Bench",
        //       html: `
        //  <h1>Sua nova senha é </h1>

        //  <br>
        //  <p>${senhaAleatoria}</p>
        //  <br>
        //  você poderá alterar depois
        //  <a href="http://localhost:4200/" > logar com nova senha!</a>
        //  `,
        //     };

        //     transporter.sendMail(mailOptions, function (error, info) {
        //       if (error) {
        //         console.log(error);
        //       } else {
        //         console.log("Email sent: " + info.response);
        //       }
        //     });

        // const nodemailer = require("nodemailer");

        const transporter = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 465,
          secure: true, // Use `true` for port 465, `false` for all other ports
          auth: {
            user: "bancobenchbrasil@gmail.com",
            pass: "jxvo kmmu ydox akql",
          },
        });
        //! jxvo kmmu ydox akql senha definida na verificacao de 2 etapas por app
        // async..await is not allowed in global scope, must use a wrapper
        async function main() {
          // send mail with defined transport object
          const info = await transporter.sendMail({
            from: '"Bench Bank" <bancobenchbrasil@gmail.com>', // sender address
            to: req.body.dados.email, // list of receivers
            subject: "Olá Fulano  ✔", // Subject line
            text: "Email Top HAHAAH", // plain text body
            html: `
            <h1>Sua nova senha é </h1>
            <br>
            <p>${senhaAleatoria}</p>
            <br>
            você poderá alterar depois  <br>
            <a href="http://localhost:4200/" > logar com nova senha!</a>
            `,
          });
          console.log("Message sent: %s", info.messageId);
          // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
        }
        main().catch(console.error);

        //! const { MailtrapClient } = require("mailtrap");

        //! const TOKEN = "fdfa36c1a56e8dffc0fd8eaf7c4256a1";
        //! const ENDPOINT = "https://send.api.mailtrap.io/";

        //! const client = new MailtrapClient({ endpoint: ENDPOINT, token: TOKEN });

        //! const sender = {
        //!   email: "davidelino290@gmail.com",
        //!   name: "Mailtrap Test",
        //! };
        //! const recipients = [
        //!   {
        //!     email: "bancobenchbrasil@gmail.com",
        //!   }
        //! ];

        //! client
        //!   .send({
        //!     from: sender,
        //!     to: recipients,
        //!     subject: "You are awesome!",
        //!     text: "Congrats for sending test email with Mailtrap!",
        //!     category: "Integration Test",
        //!   })
        //!   .then(console.log, console.error);

        // const options = {
        //   method: 'POST',
        //   url: 'https://send.api.mailtrap.io/api/send',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     Accept: 'application/json',
        //     'Api-Token': '23a8cd0b036e55a8ca77a432dbc6bfa4'
        //   },
        //   data: {
        //     to: [{email: 'bancobenchbrasil@gmail.com', name: 'David'}],
        //     from: {email: 'davidelino290@gmail.com', name: 'Team Bench'},
        //     attachments: [
        //       {
        //         content: 'PCFET0NUWVBFIGh0bWwCg',
        //         filename: 'index.html',
        //         type: 'text/html',
        //         disposition: 'attachment'
        //       }
        //     ],
        //     // custom_variables: {user_id: '45982', batch_id: 'PSJ-12'},
        //     headers: {'X-Message-Source': 'dev.mydomain.com'},
        //     subject: 'Your Example Order Confirmation',
        //     text: 'Congratulations on your order no. 1234',
        //     category: 'API Test'
        //   }
        // };

        // try {
        //   const { data } = await axios.request(options);
        //   console.log(data);
        // } catch (error) {
        //   console.error(error);
        // }

        res.status(200).json({ mensagem: "Usuario Enviado", usuario });
      } catch (error) {
        console.error(error, " Erro ao Recuperar Senha");
      }
    } else {
      res.status(400).json({ mensagem: "Usuario Negado" });
    }
  }
}

module.exports = RecuperarService;
