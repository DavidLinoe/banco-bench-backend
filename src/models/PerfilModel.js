const pool = require("./../db/pg");

const conexao = pool;

class PerfilModel {
  consultarDados(id) {
    console.log("Log do Perfil ", id);

    //todo l.senha,

    return conexao.query(`
        
        SELECT
            l.email,
            l.telefone,
            c.nome_cliente,
            l.cpf
        FROM 
            login l 
        LEFT JOIN
            cliente c  on l.id_cliente  = c.id_cliente
        WHERE  
            l.id_cliente = '${id}' 
            
            `);
  }

  atualizarDadosCliente({ nome, emailC, telefone, email }, senha) {
    console.log("Log do Perfil ", emailC);
    console.log("Log do Perfil Senha ", senha);

    return conexao.query(
      `
    update login 
        set telefone = '${telefone}', email = '${email}', senha = '${senha}'
    FROM 
        login l 
    WHERE  
        login.email = '${emailC}'

            `
    );
  }

  atualizarDadosLogin({ nome, emailC }) {
    console.log("Log do Perfil 2!!!!!!!!!!!!!! ", emailC);
    return conexao.query(
      `
    UPDATE 
        public.cliente c
    SET 
        nome_cliente =  '${nome}'
    FROM 
        public.login l
    WHERE 
        l.id_cliente = c.id_cliente
    AND 
        l.email = '${emailC}';

            `
    );
  }

  autenticarEmail(email) {
    return conexao.query(`

        SELECT
             l.senha
        FROM 
            public.login l
        WHERE 
            email = '${email}'

       `);
  }

  consultarClienteEtapa1( email ) {
    return conexao.query(`
    
    SELECT
        l.email
    FROM 
        login l 
    WHERE  
        l.email = '${email}' 
        
        `);
  }

  consultarClienteEtapa3(telefone ) {
    return conexao.query(`
    
    SELECT
        l.telefone
    FROM 
        login l 
    WHERE  
        l.telefone = '${telefone}' 
        
        `);
  }
}
module.exports = PerfilModel;
