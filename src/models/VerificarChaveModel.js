const pool = require("../db/pg");

class VerificarChaveModel {
  autenticarSenha(telefone) {
    
    console.log("Log Do Verificar ChaveModel ", telefone);

    return pool.query(`
    SELECT
        l.telefone,
        c.nome_cliente,
        c.id_cliente
    FROM 
        login l 
    LEFT JOIN
        cliente c  on l.id_cliente  = c.id_cliente
    WHERE  
        l.telefone = '${telefone}' 
 
   `);
  }
  autenticarEmail(email) {
    
    console.log("Log Do Verificar ChaveModel ", email);
 
    return pool.query(`

    SELECT
        l.email,  
        c.nome_cliente,
        c.id_cliente
    FROM 
        login l 
    LEFT JOIN
        cliente c on l.id_cliente = c.id_cliente
    WHERE  
        l.email = '${email}'
   `);
  }
  autenticarCpf(cpf) {
    
    console.log("Log Do Verificar ChaveModel ", cpf);

    return pool.query(`

    SELECT
        l.cpf,
        c.nome_cliente,
        c.id_cliente
    FROM 
        login l 
    LEFT JOIN
        cliente c on l.id_cliente = c.id_cliente    
    WHERE  
        l.cpf = '${cpf}'
   `);
  }
}
module.exports = VerificarChaveModel;