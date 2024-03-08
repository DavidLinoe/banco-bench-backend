const express = require("express")
const { LoginRouter } = require("./LoginRouter")
const { RegisterRouter } = require("./RegisterRouter")
const { UserRouter } = require("./UserRouter")
const { VerificarChaveRouter } = require("./VerificarChaveRouter")


const indexRouter = express.Router()

indexRouter.use(LoginRouter)
indexRouter.use(RegisterRouter)
indexRouter.use(UserRouter)
indexRouter.use(VerificarChaveRouter)

module.exports = indexRouter