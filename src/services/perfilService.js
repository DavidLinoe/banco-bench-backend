const PerfilModel = require("./../models/PerfilModel");
const jwt = require("jsonwebtoken");
const perfilModel = new PerfilModel();
const bcrypt = require("bcrypt");

// const saldoCliente =

class PerfilService {
  async dadosCliente(req, res) {
    try {
      const token = req.body.id_cliente;

      console.log("Token Perfil : ", token);
      ("");

      const verifyToken = jwt.verify(token, process.env.SECRET_PASS);

      console.log("Verify Token Perfil: ", verifyToken.id);

      const [dados] = (await perfilModel.consultarDados(verifyToken.id)).rows;
      console.log(dados);
      if (dados) {
        res.status(200).json({ mensagem: "Usuario Enviado", ...dados });
        console.log("Log no Perfil... :", dados);
      } else {
        res.status(404).json({ mensagem: "Usuario Negado" });
      }
    } catch (error) {
      res.status(404).json({ mensagem: "Usuario Negado" });
      console.error("Erro  354!: ", error.message);
    }
  }

  async dadosClienteNovo(req, res) {
    try {
      console.log("Log no Novos dados ! :", req.body.dados);

      const randomSalt = 10;

      const senhaHash = await bcrypt.hash(req.body.dados1, randomSalt);

      console.log("LOG IMPORTANTE", req.body);

      const [verificarCliente1] = (
        await perfilModel.consultarClienteEtapa1(req.body.dados.email)
      ).rows;

      const [verificarCliente2] = (
        await perfilModel.consultarClienteEtapa3(req.body.dados.telefone)
      ).rows;

    //   if (verificarCliente1 || verificarCliente2) {
    //     if (verificarCliente1) {
    //       res.status(405).json({ mensagem: "Email Ja Existe !" });
    //       console.log("Email Ja Existe Erro 405 !");
    //     } else if (verificarCliente2) {
    //       res.status(412).json({ mensagem: "Cpf Ja Existe !" });
    //       console.log("Telefone Ja Existe Erro 412 !");
    //     }
    //   } else {
        const [novosDados] = (
          await perfilModel.atualizarDadosCliente(req.body.dados, senhaHash)
        ).rows;

        const novosDadosC = (
          await perfilModel.atualizarDadosLogin(req.body.dados)
        ).rows;

        res.status(200).json({ mensagem: "Usuario Enviado", ...novosDadosC });
        console.log("Log no Novos dados ! :");
    //   }

      //    else {
      //     res.status(404).json({ mensagem: "Usuario Negado" });
      //   }
    } catch (error) {
      res.status(404).json({ mensagem: "Usuario Negado" });
      console.error("Erro ao atualizar Dados !: ", error.message);
    }
  }
  async dadosSenha(req, res) {
    const senhaCorreta = req.body.dados;

    try {
      const [email] = (await perfilModel.autenticarEmail(req.body.dados.email))
        .rows;

      if (email) {
        const compareS = await bcrypt.compare(
          req.body.dados.senhaAtual,
          email.senha
        );
        console.log("Senha Digitada No Alterar Correta !:", compareS);

        console.log("Senha  Correta !:", senhaCorreta);

        if (compareS == true) {
          res.status(200).json({ mensagem: "Senha Enviado", ...senhaCorreta });

          console.log("Nova senha !: ", req.body.dados.senhaNova);
        } else {
          res.status(400).json({ mensagem: "Senha Enviado" });
        }
      }
    } catch (err) {
      res.status(400).json({ mensagem: "Usuario Negado", err });
      console.error("Req Expirada!: ", error.message);
    }
  }
}
module.exports = PerfilService;
