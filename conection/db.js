const { Pool } = require('pg');
 
const pool = new Pool({
  host: 'localhost',
  port: 5432,
  database: 'banco-bench',
  user: 'CucaPost',
  password: '3*Cuc4x!z-$0',

})


class BancoBench{
    async listarLogin({email,senha}){
     // console.log(email);
        const login= await pool.query(`select * from public.login where email = '${email}' and senha = '${senha}'`)
       
        return login.rows
    }
    
}

module.exports = BancoBench