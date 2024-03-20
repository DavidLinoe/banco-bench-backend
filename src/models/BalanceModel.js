const pool = require("./../db/pg");

class BalanceModel {
  balanceAdd({id_cliente,saldo}) {
    return pool.query(`

    update cliente 

    set saldo_cliente = saldo_cliente + ${saldo} 
     
    FROM 
        login l  
    
    WHERE  
        cliente.id_cliente = ${id_cliente}

`);
  }
  balanceRemove({id_cliente, saldo}) {
    return pool.query(` 
 
    update cliente 

    set saldo_cliente = saldo_cliente - ${saldo}
     
    FROM 
        login l 
    
    WHERE  
        cliente.id_cliente = ${id_cliente}

  
`);
  }
}
module.exports = BalanceModel;
