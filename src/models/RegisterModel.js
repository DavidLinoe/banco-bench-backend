const pool = require("../db/pg");

const conexao = pool;
class RegisterModel {

  consultarClienteEtapa1( email) {
    return conexao.query(`
    
    SELECT
        l.email
    FROM 
        login l 
    WHERE  
        l.email = '${email}' 
        
        `);
  }

  consultarClienteEtapa2( cpf ) {
    return conexao.query(`
    
    SELECT
        l.cpf
    FROM 
        login l 
    WHERE  
        l.cpf = '${cpf}' 
        
        `);
  }


  consultarClienteEtapa3( telefone ) {
    return conexao.query(`
    
    SELECT
        l.telefone
    FROM 
        login l 
    WHERE  
        l.telefone = '${telefone}' 
        
        `);
  }


  insertCliente({ nome }) {
    return conexao.query(`
    INSERT INTO public.cliente
      (nome_cliente, saldo_cliente)
    VALUES('${nome}', '0') returning *
    
       `);
  }
  insertLogin({ telefone, email, senha, id_cliente, cpf }) {
    return conexao.query(`
    
    INSERT INTO public.login
      (email, senha, telefone, id_cliente, cpf)
    VALUES('${email}', '${senha}', '${telefone}', ${id_cliente}, '${cpf}');
    
       `);
  }
  insertLoginSenha(id, senha) {
    console.log("Log query Senha", senha);
    console.log("Log query ID", id);

    return conexao.query(`
    
    UPDATE
    public.login
    SET
      senha = '${senha}'
    WHERE
      id_cliente = '${id}'
      
      `);
  }
}

module.exports = RegisterModel;
