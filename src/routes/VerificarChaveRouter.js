
const { Router } = require("express");
const { VerificarChaveController } = require("../controllers");
const router =  Router()
const chave = new VerificarChaveController()

router.post("/verificar/chave/telefone",chave.chaveTelefone)
router.post("/verificar/chave/email",chave.chaveEmail)
router.post("/verificar/chave/cpf",chave.chaveCpf)


module.exports.VerificarChaveRouter = router;