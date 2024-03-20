const BalanceController = require("../controllers/BalanceController");
const { Router } = require("express");
const saldo = new BalanceController()
const router = Router()

router.post("/saldo/add",saldo.saldoMais)

router.post("/saldo/remove",saldo.saldoMenos)


module.exports.BalanceRouter = router