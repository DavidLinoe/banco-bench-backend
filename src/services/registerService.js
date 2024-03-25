const bcrypt = require("bcrypt");
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

    const randomSalt = 10;
    console.log("senha antes do hash", req.body.dados.senha);

    const senhaHash = await bcrypt.hash(req.body.dados.senha, randomSalt);
    console.log("senha Depois do hash ! ", senhaHash);

    if (senhaHash) {
      const senhaCripty = (
        await registerModel.insertLoginSenha(cliente.id_cliente, senhaHash)
      ).rows;
      console.log("senha Depois de Inserir no Banco ", senhaCripty);

      const compareS = await bcrypt.compare(req.body.dados.senha, senhaHash);
      console.log("senha Verificada ", compareS);
    }

    if (cliente) {
      res.status(200).json({ mensagem: "Registro Efetuado" });
    } else {
      res.status(400).json({ mensagem: "Registro Negado" });
    }





    }
 
 

 }
}


module.exports = RegisterService;
