const pool = require("../db/pg");

const conexao = pool;
class LoginModel {
  autenticarEmail( email ) {
    return conexao.query(`
        SELECT
            c.nome_cliente,
            c.saldo_cliente, 
            c.id_cliente,
            l.senha
        FROM public.login l
       LEFT JOIN 
        cliente c  on l.id_cliente  = c.id_cliente 
        WHERE email = '${email}'
       `);
  }


}
module.exports = LoginModel;
