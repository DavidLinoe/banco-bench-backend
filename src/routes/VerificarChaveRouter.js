
const { Router } = require("express");
const { VerificarChaveController } = require("../controllers");
const router =  Router()
const chave = new VerificarChaveController()

router.post("/verificar/chave",chave.chave)


module.exports.VerificarChaveRouter = router;