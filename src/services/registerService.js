const RegisterModel = require("../models/RegisterModel");

const registerModel = new RegisterModel();

class RegisterService {
  async registrarCliente(req, res) {
 
    const [cliente] = (await registerModel.insertCliente(req.body.dados)).rows;
    console.log(cliente);
    const login = (await registerModel.insertLogin({...req.body.dados, id_cliente:cliente.id_cliente})).rows;
    console.log(login);
    if (cliente) {
      res.status(200).json({ mensagem: "Registro Efetuado" });
    } else {
      res.status(400).json({ mensagem: "Registro Negado" });
    }
  }
}
module.exports = RegisterService;
