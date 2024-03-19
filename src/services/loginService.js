const LoginModel = require("../models/loginModel");
const  jwt = require( "jsonwebtoken");
require('dotenv').config()

const loginModel = new LoginModel();

class LoginService {
  async teste(req, res) {
    const [cliente] = (await loginModel.autenticar(req.body.dados)).rows;
    console.log(cliente);
    if (cliente) {

      const token = jwt.sign({ 
        
        id:cliente.id_cliente,
        nome:cliente.nome_cliente,
        saldo:cliente.saldo_cliente

      }, process.env.SECRET_PASS,{ expiresIn: 500 })
    

      console.log('Token: ',token)

      const verifyToken = jwt.verify(token,process.env.SECRET_PASS);
      console.log('Verify Token: ',verifyToken)


      return res.status(200).json({ mensagem: "Usuario Enviado", token })

        
      



      // return done(new TokenExpiredError('jwt expired', new Date(payload.exp * 1000)));

      // if(verifyToken){

      // setTimeout(() => {

      //   const verifyToken2 = jwt.verify(token,SECRET);
      //   console.log('Verify Token2: ',verifyToken2)

      // },20000);
        

      // } 
  

      // res.status(200).json({ mensagem: "Login Efetuado", ...cliente });
      // // res.status(200).json({ mensagem: "Login Efetuado Token", token });

      

    } else {
      res.status(400).json({ mensagem: "Login Negado" });
    }
  }
}
module.exports = LoginService;
