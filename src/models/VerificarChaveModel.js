const pool = require("../db/pg");

class VerificarChaveModel {
  autenticar(telefone) {
    
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
  
}
module.exports = VerificarChaveModel;