const UserModel = require("../models/UserModel");

const userModel = new (UserModel);

class UserService {
  async enviarModel(req, res) {

    const [user] = (await userModel.searchUser(req.body.id_cliente)).rows;
    console.log(user)
    if (user) {
      res.status(200).json({ mensagem: "Usuario Enviado", user });
    } else {
      res.status(400).json({ mensagem: "Usuario Negado" });
    }
  }

}
module.exports = UserService;
