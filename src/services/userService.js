const UserModel = require("../models/UserModel");
const  jwt = require( "jsonwebtoken");
// import {bcrypt} from "bcrypt";

const userModel = new (UserModel);
 
class UserService {
  async enviarModel(req, res) {

    const token = req.body.id_cliente;
 
    console.log('Token User : ',token);


    
    const verifyToken = jwt.verify(token,process.env.SECRET_PASS);

    console.log('Verify Token User: ', verifyToken.id);

    // if(verifyToken){
    // return res.status(200).json({ mensagem: "Usuario Enviado", verifyToken })
    // } 


    const [user] = (await userModel.searchUser(verifyToken.id)).rows;
    console.log(user) 
    if (user) { 
     // console.log("Log do req no user, token: ",req.body.token_cliente);
      
 
// // // //
    //  res.status(200).json({ mensagem: "Usuario Enviado", user });
     res.status(200).json({ mensagem: "Usuario Enviado", ...user });
      console.log("Log no user... :",user)
    } else {
      res.status(404).json({ mensagem: "Usuario Negado" });
    }
  }






}
module.exports = UserService;
