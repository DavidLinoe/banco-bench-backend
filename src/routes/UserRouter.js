

const { Router } = require("express");
const { UserController } = require("../controllers");
const router =  Router()
const user = new UserController()

router.post("/user",user.user)

module.exports.UserRouter = router;
