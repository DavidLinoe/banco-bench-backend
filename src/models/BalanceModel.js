const pool = require("./../db/pg");

class BalanceModel {
  balanceGet(id_saldo) {
    return pool.query(`

        SELECT
            s.entradas_saldo,
            s.saidas_saldo  
        FROM
            saldo s  
        WHERE
            id_saldo = ${+id_saldo}
`);
  }
}
module.exports = BalanceModel;
