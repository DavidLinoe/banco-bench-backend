const BalanceService = require("../services/balenceService");

const balanceService = new BalanceService();
class BalanceController {
  saldoMais(req, res) {
    balanceService.somarSaldo(req, res);
  }
  saldoMenos(req, res) {
    balanceService.subtrairSaldo(req, res);
  }

}
module.exports = BalanceController;
