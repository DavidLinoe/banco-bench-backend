const { RegisterController } = require("../controllers/index")
const { Router } = require("express");
const register = new RegisterController()
const router = Router()

router.post("/authentication/register",register.register)



module.exports.RegisterRouter = router