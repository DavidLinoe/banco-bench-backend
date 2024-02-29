const { LoginController } = require("../controllers/index")
const { Router } = require("express");
const login = new LoginController()
const router = Router()

router.post("/authentication",login.login)



module.exports.LoginRouter = router