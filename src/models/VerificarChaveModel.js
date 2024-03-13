const pool = require("../db/pg");

class VerificarChaveModel {
  autenticarSenha(telefone) {
    
    console.log("Log Do Verificar ChaveModel ", telefone);

    return pool.query(`

    SELECT
    l.telefone  
FROM 
    login l 
WHERE  
    l.telefone = '${telefone}'
   `);
  }
  autenticarEmail(email) {
    
    console.log("Log Do Verificar ChaveModel ", email);

    return pool.query(`

    SELECT
    l.email  
FROM 
    login l 
WHERE  
    l.email = '${email}'
   `);
  }
  autenticarCpf(cpf) {
    
    console.log("Log Do Verificar ChaveModel ", cpf);

    return pool.query(`

    SELECT
    l.cpf  
FROM 
    login l 
WHERE  
    l.cpf = '${cpf}'
   `);
  }
}
module.exports = VerificarChaveModel;