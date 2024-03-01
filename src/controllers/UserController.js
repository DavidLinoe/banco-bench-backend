const UserService = require("../services/userService");


const userService = new UserService();

class UserController {
  user(req, res) {
    userService.enviarModel(req, res)
  }
}
module.exports = UserController;
