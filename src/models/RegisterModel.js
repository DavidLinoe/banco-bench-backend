const pool = require("../db/pg");

const conexao = pool;
class RegisterModel {
  insertCliente({ nome }) {
    return conexao.query(`
    INSERT INTO public.cliente
      (nome_cliente, saldo_cliente)
    VALUES('${nome}', '0') returning *
    
       `);
  }
  insertLogin({ telefone, email, senha, id_cliente }) {
    return conexao.query(`
    
    INSERT INTO public.login
      (email, senha, telefone, id_cliente)
    VALUES('${email}', '${senha}', '${telefone}', ${id_cliente});
    
       `);
  }
}

module.exports = RegisterModel;
