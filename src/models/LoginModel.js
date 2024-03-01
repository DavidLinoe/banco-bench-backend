const pool = require("../db/pg");

const conexao = pool;
class LoginModel {
  autenticar({ email, senha }) {
    return conexao.query(`
        SELECT
            c.nome_cliente,
            c.saldo_cliente, 
            c.id_cliente
        FROM public.login l
       LEFT JOIN 
        cliente c  on l.id_cliente  = c.id_cliente 
        WHERE email = '${email}' and senha ='${senha}'
       `);
  }
}
module.exports = LoginModel;
