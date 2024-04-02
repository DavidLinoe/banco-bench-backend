const pool = require("./../db/pg")
const conexao = pool


class RecuperarModel{

    verificarDados(telefone, cpf) {
        return conexao.query(`
        
        SELECT
            l.email,
            l.cpf,
            l.telefone
        FROM 
            login l 
        WHERE  
            l.telefone = '${telefone}' and l.cpf = '${cpf}'
            
            `);
      }

      atualizarSenha({email,cpf, telefone}, novaSenha) {
        console.log("Log query cpf ", cpf);
        console.log("Log query telefone ", telefone);
        console.log("Log query Nova Senha ", novaSenha);

        return conexao.query(`
        
        UPDATE
            public.login
        SET
            senha = '${novaSenha}'
        WHERE
            telefone = '${telefone}' and cpf = '${cpf}' and email = '${email}'
          
          `);
      }




}

module.exports = RecuperarModel;