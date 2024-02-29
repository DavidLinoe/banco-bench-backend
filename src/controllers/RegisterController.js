const RegisterService = require("../services/registerService")

const registerService = new RegisterService()
class RegisterController{

    register(req,res){
        registerService.registrarCliente(req,res)
    }  
    
    
}
module.exports = RegisterController