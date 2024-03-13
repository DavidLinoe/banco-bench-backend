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
  insertLogin({ telefone, email, senha, id_cliente, cpf}) {
    return conexao.query(`
    
    INSERT INTO public.login
      (email, senha, telefone, id_cliente, cpf)
    VALUES('${email}', '${senha}', '${telefone}', ${id_cliente}, '${cpf}');
    
       `);
  }
}

module.exports = RegisterModel;
