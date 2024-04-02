const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

//import { compare } from "bcrypt";

const RegisterModel = require("../models/RegisterModel");

const registerModel = new RegisterModel();

class RegisterService {
  async registrarCliente(req, res) {

    const [verificarCliente1] = ( await registerModel.consultarClienteEtapa1(req.body.dados.email) ).rows;
    const [verificarCliente2] = (await registerModel.consultarClienteEtapa2(req.body.dados.cpf)).rows;
    const [verificarCliente3] = ( await registerModel.consultarClienteEtapa3(req.body.dados.telefone)).rows;

    if(verificarCliente1 || verificarCliente2 || verificarCliente3 ){

    if( verificarCliente1){
      res.status(405).json({ mensagem: "Email Ja Existe !" });
      console.log("Email Ja Existe Erro 405 !");
    }
      
    else if( verificarCliente2){
      res.status(409).json({ mensagem: "Cpf Ja Existe !" });
      console.log("Cpf Ja Existe Erro 409 !");
    }
      
    else if(verificarCliente3) {
      res.status(412).json({ mensagem: "Cpf Ja Existe !" });
      console.log("Telefone Ja Existe Erro 412 !");

    }

  
    }else{
      const [cliente] = (await registerModel.insertCliente(req.body.dados))
      .rows;
    console.log(cliente);
    const login = (
      await registerModel.insertLogin({
        ...req.body.dados,
        id_cliente: cliente.id_cliente,
      })
    ).rows;
    console.log(login);



    if (cliente) {


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
      // console.log("Senha aleatória: ", senhaAleatoria);

      //* const senhaNovaHash = await registerModel.insertLoginSenha(cliente.id_cliente,senhaAleatoria).rows;
      const randomSalt = 10;
      const senhaHash = await bcrypt.hash(senhaAleatoria, randomSalt);
  
      if (senhaHash) {
        const senhaCripty = (
          await registerModel.insertLoginSenha(cliente.id_cliente, senhaHash)
        ).rows;
      }

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
          subject:`Olá ${req.body.dados.nome}  ✔`, // Subject line
          text: "Registro Efetuado Com Sucesso",// plain text body
          html: `
          <h1>Não Responda</h1>
          <h2>Sua nova senha é </h2>
          <p>Não Compartilhe com niguem</p>
          <br>
          <p>${senhaAleatoria}</p>
          <br>
          você poderá alterar depois em account<br>
          <a href="http://localhost:4200/" > logar com nova senha!</a>
          <a href="http://localhost:4200/sac" > Não Reconhece Esse Login ? Ignore ou entre em contato</a>

          `,
        });
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }
      main().catch(console.error);



      res.status(200).json({ mensagem: "Registro Efetuado" });
    } else {
      res.status(400).json({ mensagem: "Registro Negado" });
    }





    }
 
 

 }
}


module.exports = RegisterService;
