
const RecuperarController = require("./../controllers/RecuperarController");
const { Router } = require("express");
const recuperar = new RecuperarController();
const router = Router();


router.post("/recuperar", recuperar.dados)

module.exports.RecuperarRouter = router