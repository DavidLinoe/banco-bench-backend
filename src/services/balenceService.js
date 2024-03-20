const BalaceModel = require("./../models/BalanceModel");
const balanceModel = new BalaceModel();

class BalanceService {
  async somarSaldo(req, res) {
    console.log("Log no Balance Service Soma: ", req.body.res);
    const soma = (await balanceModel.balanceAdd(req.body.res)).rows;
    if (soma) {
      res.status(200).json({ mensagem: "saldo atualizado Adicionado" });
      console.log("Saldo Atualizado !");
    } else {
      res.status(400).json({ mensagem: "erro" });
      console.log("Erro Ao Atualiza Saldo Adicionado!");
    }
  }
  async subtrairSaldo(req, res) {
    console.log("Log no Balance Service Sub: ", req.body.res);
    // const subtracao = (await balanceModel.balanceRemove(req.body.res)).rows;

    try {
      const subtracao = (await balanceModel.balanceRemove(req.body.res)).rows;
      if (subtracao) {
        res.status(200).json({ mensagem: "saldo atualizado Removido" });
        console.log("Saldo Atualizado Removido !");
      } else {
        res.status(400).json({ mensagem: "erro" });
        console.log("Erro Ao Atualiza Saldo !");
      }
    } catch (error) {
      console.error("Erro ao realizar a operação:", error.message);
      res.status(400).json({ mensagem: "erro" });
      console.log("Erro Ao Atualiza Saldo !");
    }
  }
}
module.exports = BalanceService;
