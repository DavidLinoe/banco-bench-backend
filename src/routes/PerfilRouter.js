
const PerfilController = require("./../controllers/PerfilController");
const {Router} = require("express");
const perfil  = new PerfilController()
const router = Router()

router.post("/perfil", perfil.perfil)
router.post("/perfil/alterar", perfil.perfilNovo)
router.post("/perfil/senha", perfil.perfilSenha)

module.exports.PerfilRouter = router