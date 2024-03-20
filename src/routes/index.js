const express = require("express")
const { LoginRouter } = require("./LoginRouter")
const { RegisterRouter } = require("./RegisterRouter")
const { UserRouter } = require("./UserRouter")
const { VerificarChaveRouter } = require("./VerificarChaveRouter")
const { BalanceRouter } = require("./BalanceRouter")


const indexRouter = express.Router()

indexRouter.use(LoginRouter)
indexRouter.use(RegisterRouter)
indexRouter.use(UserRouter)
indexRouter.use(VerificarChaveRouter)
indexRouter.use(BalanceRouter)

module.exports = indexRouter