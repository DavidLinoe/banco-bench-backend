const pool = require("../db/pg");

class UserModel {
  searchUser(id_cliente) {
    console.log("LOGDAQUERY ", id_cliente);
    return pool.query(`
        SELECT
            c.id_cliente,   
            c.nome_cliente,
            c.saldo_cliente 
        FROM 
            cliente c 
        WHERE 
            id_cliente = ${+id_cliente}
  
            `);
  }
}
module.exports = UserModel;
