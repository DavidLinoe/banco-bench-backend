const LoginService = require("../services/loginService")

const loginService = new LoginService()
class LoginController{

    login(req,res){
    loginService.teste(req,res)
    }   
}
module.exports = LoginController